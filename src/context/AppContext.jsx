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
import featuredDestinations from '../data/mockDestinations.js'
import { getHeroImage, getSubtitle, buildGeneratedPlan } from '../utils/itineraryHelpers.js'
import { generateItineraryWithAI } from '../services/geminiService.js'
import { fetchDestinationImage, fetchBackgroundImages } from '../services/pexelsService.js'

const AppContext = createContext(null)

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const defaultProfile = {
  fullName: mockUser.name,
  phone: mockUser.phone
}

async function seedUserDataIfNeeded(uid) {
  const tripsSnapshot = await getDocs(collection(db, 'users', uid, 'trips'))
  if (!tripsSnapshot.empty) return

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
  writes.push(setDoc(doc(db, 'users', uid, 'profile', 'main'), defaultProfile))

  await Promise.all(writes)
}

export function AppProvider({ children }) {
  const { currentUser } = useAuth()

  const [trips, setTrips] = useState([])
  const [itineraries, setItineraries] = useState({})
  const [savedItems, setSavedItems] = useState([])
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [profile, setProfile] = useState(defaultProfile)
  const [dataLoading, setDataLoading] = useState(true)
  const [pendingDestination, setPendingDestination] = useState(null)
  const [toast, setToast] = useState({ visible: false, message: '', icon: '✓' })
  const toastTimer = useRef(null)

  // Rolling background photos — fetched once per app session (not tied
  // to login state), reused across Home/Trips/Explore/Saved so we don't
  // re-query Pexels on every navigation.
  const [backgroundImages, setBackgroundImages] = useState([])

  useEffect(() => {
    fetchBackgroundImages(6)
      .then(setBackgroundImages)
      .catch((err) => {
        console.error('Failed to fetch background images, using fallback:', err)
        setBackgroundImages(featuredDestinations.map((d) => d.imageUrl))
      })
  }, [])

  useEffect(() => {
    if (!currentUser) {
      setTrips([])
      setItineraries({})
      setSavedItems([])
      setPreferences(defaultPreferences)
      setProfile(defaultProfile)
      setDataLoading(false)
      return
    }

    setDataLoading(true)

    seedUserDataIfNeeded(currentUser.uid)
      .catch((err) => console.error('Error seeding user data:', err))
      .finally(() => setDataLoading(false))

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

    const unsubProfile = onSnapshot(
      doc(db, 'users', currentUser.uid, 'profile', 'main'),
      (snapshot) => {
        if (snapshot.exists()) setProfile(snapshot.data())
      }
    )

    return () => {
      unsubTrips()
      unsubItineraries()
      unsubSaved()
      unsubPreferences()
      unsubProfile()
    }
  }, [currentUser])

  const showToast = useCallback((message, icon = '✓') => {
    setToast({ visible: true, message, icon })
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }))
    }, 2200)
  }, [])

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

  const updateProfile = useCallback((updates) => {
    if (!currentUser) return
    setDoc(doc(db, 'users', currentUser.uid, 'profile', 'main'), updates, { merge: true })
      .catch((err) => console.error('Error saving profile:', err))
  }, [currentUser])

  const user = {
    name: profile.fullName,
    phone: profile.phone,
    tier: mockUser.tier,
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
    updateProfile,
    user,
    backgroundImages
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