import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  getDocs
} from 'firebase/firestore'
import { db } from '../firebase/config.js'
import { useAuth } from './AuthContext.jsx'
import mockTrips from '../data/mockTrips.js'
import mockSavedItems from '../data/mockSaved.js'
import mockItineraries from '../data/mockItineraries.js'
import mockUser, { defaultPreferences } from '../data/mockUser.js'
import { getHeroImage, getSubtitle, buildGeneratedPlan } from '../utils/itineraryHelpers.js'
import { generateItineraryWithAI } from '../services/geminiService.js'
import { fetchDestinationImage } from '../services/pexelsService.js'

const AppContext = createContext(null)

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// The very first time a user logs in, their Firestore account has no
// data yet. This copies our starting mock data into their account so
// the app isn't empty on first login. It only runs once per account —
// it checks if trips already exist before writing anything.
async function seedUserDataIfNeeded(uid) {
  const tripsSnapshot = await getDocs(collection(db, 'users', uid, 'trips'))
  if (!tripsSnapshot.empty) return // already seeded — nothing to do

  const writes = []

  Object.values(mockItineraries).forEach((itinerary) => {
    writes.push(setDoc(doc(db, 'users', uid, 'itineraries', itinerary.id), itinerary))
  })
  mockTrips.forEach((trip) => {
    writes.push(setDoc(doc(db, 'users', uid, 'trips', trip.id), trip))
  })
  mockSavedItems.forEach((item) => {
    writes.push(setDoc(doc(db, 'users', uid, 'saved', item.id), item))
  })
  writes.push(setDoc(doc(db, 'users', uid, 'preferences', 'main'), defaultPreferences))

  await Promise.all(writes)
}

export function AppProvider({ children }) {
  const { currentUser } = useAuth()

  const [trips, setTrips] = useState([])
  const [itineraries, setItineraries] = useState({})
  const [savedItems, setSavedItems] = useState([])
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [dataLoading, setDataLoading] = useState(true)
  const [pendingDestination, setPendingDestination] = useState(null)
  const [toast, setToast] = useState({ visible: false, message: '', icon: '✓' })
  const toastTimer = useRef(null)

  // Whenever the logged-in user changes (login, logout, or switching
  // accounts), reconnect to that user's own data in Firestore.
  useEffect(() => {
    if (!currentUser) {
      // Logged out — clear everything back to empty/defaults.
      setTrips([])
      setItineraries({})
      setSavedItems([])
      setPreferences(defaultPreferences)
      setDataLoading(false)
      return
    }

    setDataLoading(true)

    seedUserDataIfNeeded(currentUser.uid)
      .catch((err) => console.error('Error seeding user data:', err))
      .finally(() => setDataLoading(false))

    // onSnapshot keeps these lists updated live — any write (from
    // generateItinerary, toggleFavorite, etc.) is picked up automatically.
    const unsubTrips = onSnapshot(
      collection(db, 'users', currentUser.uid, 'trips'),
      (snapshot) => setTrips(snapshot.docs.map((d) => d.data()))
    )

    const unsubItineraries = onSnapshot(
      collection(db, 'users', currentUser.uid, 'itineraries'),
      (snapshot) => {
        const itinerariesById = {}
        snapshot.docs.forEach((d) => { itinerariesById[d.id] = d.data() })
        setItineraries(itinerariesById)
      }
    )

    const unsubSaved = onSnapshot(
      collection(db, 'users', currentUser.uid, 'saved'),
      (snapshot) => setSavedItems(snapshot.docs.map((d) => d.data()))
    )

    const unsubPreferences = onSnapshot(
      doc(db, 'users', currentUser.uid, 'preferences', 'main'),
      (snapshot) => {
        if (snapshot.exists()) setPreferences(snapshot.data())
      }
    )

    // Cleanup: stop listening when the user changes or logs out.
    return () => {
      unsubTrips()
      unsubItineraries()
      unsubSaved()
      unsubPreferences()
    }
  }, [currentUser])

  const showToast = useCallback((message, icon = '✓') => {
    setToast({ visible: true, message, icon })
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }))
    }, 2200)
  }, [])

  // Creates a new itinerary + matching trip and writes both to Firestore.
  // Returns the new id right away (not waiting for the write to finish) —
  // the screen updates automatically once Firestore confirms it via
  // the onSnapshot listener above.
    const generateItinerary = useCallback(async ({ destination, days, guests, vacationType }) => {
    if (!currentUser) return null

    const id = `${slugify(destination)}-${Date.now()}`
    const numDays = Number(days)
    const numGuests = Number(guests)

        let subtitle, summary, plan

    try {
      const aiResult = await generateItineraryWithAI(destination, numDays, numGuests, vacationType)
      subtitle = aiResult.subtitle
      summary = aiResult.summary
      plan = aiResult.plan
    } catch (err) {
      console.error('AI generation failed, using rules-based fallback:', err)
      subtitle = getSubtitle(destination)
      summary = `A curated ${vacationType.toLowerCase()} getaway built around the best of ${destination}.`
      plan = buildGeneratedPlan(destination, numDays)
    }

    let heroImageUrl
    try {
      heroImageUrl = await fetchDestinationImage(destination)
    } catch (err) {
      console.error('Pexels image fetch failed, using fallback image:', err)
      heroImageUrl = getHeroImage(destination)
    }

    const newItinerary = {
      id,
      destination,
      vibe: vacationType,
      days: numDays,
      guests: numGuests,
      subtitle,
      heroImageUrl,
      summary,
      plan
    }

    const newTrip = {
      id: `trip-${id}`,
      itineraryId: id,
      destination,
      route: destination,
      days: numDays,
      guests: numGuests,
      status: 'upcoming',
      thumbnailUrl: newItinerary.heroImageUrl
    }

    await setDoc(doc(db, 'users', currentUser.uid, 'itineraries', id), newItinerary)
    await setDoc(doc(db, 'users', currentUser.uid, 'trips', newTrip.id), newTrip)

    return id
  }, [currentUser])

  const toggleSavedTrip = useCallback((itinerary) => {
    if (!currentUser) return
    const savedId = `dest-${itinerary.id}`
    const savedRef = doc(db, 'users', currentUser.uid, 'saved', savedId)
    const exists = savedItems.some((item) => item.id === savedId)

    if (exists) {
      deleteDoc(savedRef).catch((err) => console.error('Error removing saved item:', err))
    } else {
      setDoc(savedRef, {
        id: savedId,
        name: itinerary.destination,
        type: 'destination',
        subtitle: itinerary.subtitle,
        favorited: true,
        imageUrl: itinerary.heroImageUrl
      }).catch((err) => console.error('Error saving item:', err))
    }
  }, [currentUser, savedItems])

  const toggleFavorite = useCallback((id) => {
    if (!currentUser) return
    const item = savedItems.find((i) => i.id === id)
    if (!item) return
    updateDoc(doc(db, 'users', currentUser.uid, 'saved', id), { favorited: !item.favorited })
      .catch((err) => console.error('Error updating favorite:', err))
  }, [currentUser, savedItems])

  const updatePreferences = useCallback((updates) => {
    if (!currentUser) return
    setDoc(doc(db, 'users', currentUser.uid, 'preferences', 'main'), updates, { merge: true })
      .catch((err) => console.error('Error saving preferences:', err))
  }, [currentUser])

  // Profile info (name/phone/tier) is still mock for now — Firebase
  // Auth only actually knows the email. We overlay the real email on
  // top of the mock profile so Settings shows your real login email.
  const user = {
    ...mockUser,
    email: currentUser?.email || mockUser.email
  }

  const value = {
    trips,
    itineraries,
    savedItems,
    preferences,
    dataLoading,
    pendingDestination,
    setPendingDestination,
    toast,
    showToast,
    generateItinerary,
    toggleSavedTrip,
    toggleFavorite,
    updatePreferences,
    user
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used inside an AppProvider')
  }
  return context
}