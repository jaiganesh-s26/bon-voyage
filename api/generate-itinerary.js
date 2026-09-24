export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { destination, days, guests, vacationType } = request.body || {}

  if (!destination || !days || !guests || !vacationType) {
    response.status(400).json({ error: 'Missing required fields' })
    return
  }

  const API_KEY = process.env.GEMINI_API_KEY
  const MODEL = 'gemini-3.5-flash'
  const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

  const prompt = `You are a travel planner. Create a ${days}-day trip itinerary for ${guests} guest(s) visiting ${destination}, styled as a "${vacationType}" vacation.

Respond with ONLY valid JSON, no markdown formatting, no code fences, in exactly this shape:
{
  "subtitle": "A short catchy subtitle (max 6 words)",
  "summary": "A 1-2 sentence summary of the overall trip",
  "plan": [
    { "day": 1, "title": "Short day title", "description": "1-2 sentence description of what happens this day" }
  ]
}

The plan array must contain exactly ${days} entries, one per day, in order.`

  async function callGemini() {
    const geminiResponse = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          maxOutputTokens: 2048
        }
      })
    })

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text()
      const error = new Error('Gemini API request failed with status ' + geminiResponse.status)
      error.status = geminiResponse.status
      error.body = errorBody
      throw error
    }

    return geminiResponse.json()
  }

  let data
  let lastError

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      data = await callGemini()
      lastError = null
      break
    } catch (err) {
      lastError = err
      if (err.status === 503 && attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 2000))
      } else {
        break
      }
    }
  }

  if (lastError) {
    console.error('Gemini API error response:', lastError.body || lastError.message)
    response.status(lastError.status || 500).json({ error: 'Failed to generate itinerary' })
    return
  }

  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!rawText) {
    response.status(500).json({ error: 'Gemini returned no content' })
    return
  }

  const cleaned = rawText.replace(/```json\s*/g, '').replace(/```/g, '').trim()

  try {
    const parsed = JSON.parse(cleaned)
    response.status(200).json(parsed)
  } catch (parseErr) {
    console.error('Failed to parse Gemini response as JSON. Raw text was:', rawText)
    response.status(500).json({ error: 'Failed to parse itinerary' })
  }
}