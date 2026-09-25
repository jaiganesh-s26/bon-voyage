// Calls Gemini directly from the browser. NOTE: this exposes the API
// key client-side — acceptable for local testing only, not for a
// real deployed app (see project notes on this trade-off).

const API_KEY = import.meta.env.GEMINI_API_KEY
const MODEL = 'gemini-3.6-flash'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

export async function generateItineraryWithAI(destination, days, guests, vacationType) {
  const prompt = `You are a travel planner. Create a ${days}-day trip itinerary for ${guests} guest(s) visiting ${destination}, styled as a "${vacationType}" vacation.

Respond with ONLY valid JSON, no markdown formatting, no code fences, in exactly this shape:
{
  "subtitle": "A short catchy subtitle (max 6 words)",
  "summary": "A 1-2 sentence summary of the overall trip",
  "plan": [
    { "day": 1, "title": "Short day title", "description": "1-2 sentence description of what happens this day", "foodHighlight": "One local dish or food experience to try that day (do not name specific restaurants, only dishes/cuisine styles)" }
  ],
  "stays": [
    { "tier": "Budget-Friendly", "description": "1 sentence describing the general style of budget accommodation suited to this destination" },
    { "tier": "Mid-Range Comfort", "description": "1 sentence describing mid-range accommodation suited to this destination" },
    { "tier": "Luxury Retreat", "description": "1 sentence describing luxury accommodation suited to this destination" }
  ]
}

The plan array must contain exactly ${days} entries, one per day, in order. The stays array must contain exactly 3 entries in the order shown above. Do not invent or name any specific real hotel or restaurant names — describe general styles/categories only.`

  async function callGemini() {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          maxOutputTokens: 3072
        }
      })
    })

    if (!response.ok) {
      const errorBody = await response.text()
      const error = new Error('Gemini API request failed with status ' + response.status)
      error.status = response.status
      error.body = errorBody
      throw error
    }

    return response.json()
  }

  let data
  let lastError

  // Try up to 3 times total if Gemini is temporarily overloaded (503),
  // waiting a bit longer each time. Any other kind of error (bad key,
  // bad model, etc.) fails immediately — no point retrying those.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      data = await callGemini()
      lastError = null
      break
    } catch (err) {
      lastError = err
      if (err.status === 503 && attempt < 3) {
        console.warn(`Gemini overloaded, retry ${attempt}/2 in ${attempt * 2} seconds...`)
        await new Promise((resolve) => setTimeout(resolve, attempt * 2000))
      } else {
        break
      }
    }
  }

  if (lastError) {
    console.error('Gemini API error response:', lastError.body || lastError.message)
    throw lastError
  }

  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!rawText) {
    throw new Error('Gemini returned no content')
  }

  const cleaned = rawText.replace(/```json\s*/g, '').replace(/```/g, '').trim()

  try {
    return JSON.parse(cleaned)
  } catch (parseErr) {
    console.error('Failed to parse Gemini response as JSON. Raw text was:', rawText)
    throw parseErr
  }
}