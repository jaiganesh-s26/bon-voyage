import { useApp } from '../../context/AppContext.jsx'

const INTERVAL_SECONDS = 2.5

// A continuously crossfading layer of travel photos sitting behind
// page content. By default shows the app's generic rotating photos
// (from Context); pass `images` to show a specific set instead (used
// by the Itinerary page for destination-matched photos).
function AnimatedBackground({ images }) {
  const { backgroundImages } = useApp()
  const photos = images && images.length > 0 ? images : backgroundImages

  if (!photos || photos.length === 0) return null

  const cycleDuration = photos.length * INTERVAL_SECONDS

  return (
    <div className="animated-bg" aria-hidden="true">
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