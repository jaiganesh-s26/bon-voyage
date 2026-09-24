import featuredDestinations from '../../data/mockDestinations.js'

// A slowly cross-fading, blurred layer of destination photos, sitting
// behind the page content. Purely decorative — aria-hidden so screen
// readers skip it.
function AnimatedBackground() {
  return (
    <div className="animated-bg" aria-hidden="true">
      {featuredDestinations.map((dest) => (
        <img key={dest.id} src={dest.imageUrl} alt="" />
      ))}
    </div>
  )
}

export default AnimatedBackground