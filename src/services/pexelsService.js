// Fetches a real photo matching the destination name, using Pexels'
// free stock photo search API.

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY

export async function fetchDestinationImage(destination) {
  const query = encodeURIComponent(destination + ' travel landmark')
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`

  const response = await fetch(url, {
    headers: { Authorization: API_KEY }
  })

  if (!response.ok) {
    throw new Error('Pexels API request failed with status ' + response.status)
  }

  const data = await response.json()
  const photo = data.photos?.[0]

  if (!photo) {
    throw new Error('No Pexels image found for ' + destination)
  }

  return photo.src.landscape
}