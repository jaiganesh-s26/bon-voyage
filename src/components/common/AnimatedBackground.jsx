import { useApp } from '../../context/AppContext.jsx'

// A slowly cross-fading, blurred layer of travel photos (from Pexels),
// sitting behind the page content. Purely decorative — aria-hidden so
// screen readers skip it.
function AnimatedBackground() {
  const { backgroundImages } = useApp()

  if (backgroundImages.length === 0) return null

  const cycleDuration = backgroundImages.length * 7 // seconds per image

  return (
    <div className="animated-bg" aria-hidden="true">
      {backgroundImages.map((url, index) => (
        <img
          key={url + index}
          src={url}
          alt=""
          style={{
            animationDuration: `${cycleDuration}s`,
            animationDelay: `${index * 7}s`
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground