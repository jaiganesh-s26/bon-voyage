import { useApp } from '../../context/AppContext.jsx'

const INTERVAL_SECONDS = 2.5

// A continuously crossfading layer of travel photos sitting behind
// page content. By default shows the app's generic rotating photos
// (from Context); pass `images` to show a specific set instead (used
// by the Itinerary page for destination-matched photos). Pass
// `light` for a subtler, more readable version (used on Itinerary).
function AnimatedBackground({ images, light = false }) {
  const { backgroundImages } = useApp()
  const photos = images && images.length > 0 ? images : backgroundImages

  if (!photos || photos.length === 0) return null

  const cycleDuration = photos.length * INTERVAL_SECONDS
  const className = 'animated-bg' + (light ? ' animated-bg--light' : '')

  return (
    <div className={className} aria-hidden="true">
      {photos.map((url, index) => (
        <img
          key={url + index}
          src={url}
          alt=""
          style={{
            animationDuration: `${cycleDuration}s`,
            animationDelay: `${index * INTERVAL_SECONDS}s`
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground