// Fetches real photos from Pexels' free stock photo search API.

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

// Fetches a handful of varied, high-quality travel destination photos
// for the rolling background animation. One request, several results.
export async function fetchBackgroundImages(count = 6) {
  const url = `https://api.pexels.com/v1/search?query=travel+destination+landmark&per_page=${count}&orientation=portrait`

  const response = await fetch(url, {
    headers: { Authorization: API_KEY }
  })

  if (!response.ok) {
    throw new Error('Pexels API request failed with status ' + response.status)
  }

  const data = await response.json()
  const photos = data.photos || []

  if (photos.length === 0) {
    throw new Error('No Pexels background images found')
  }

  return photos.map((photo) => photo.src.large)
}