export async function generateItineraryWithAI(destination, days, guests, vacationType) {
  const response = await fetch('/api/generate-itinerary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ destination, days, guests, vacationType })
  })

  if (!response.ok) {
    const error = new Error('Itinerary request failed with status ' + response.status)
    error.status = response.status
    throw error
  }

  return response.json()
}