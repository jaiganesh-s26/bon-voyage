// Shared logic for building itinerary content — kept separate from
// components so this "business logic" isn't mixed into the UI.

const destinationImages = {
  udaipur: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6McgPPaBbLyeJvsi3o0Rtl_YZMggPy2ya3PNuvguII4-KMa9n20Y-jjGhBqJDddGCrfLm5Ys1iE6AuOwD16kVZ1cXMYn_7ydgTlJsHUFmT_1eKjaHQ-UnVFFze8CUGk0MutkZTVvVXDctIiu_aP7QYHFY8-XuKU5ZApzSnjKf9eyXFpbhUWeqe1Cg8btGF3uT_OhU-S79Z3VB6AEU4Gll5BxBKY6tNHhsvr1voLHSN0BwEwE2wxWk',
  rajasthan: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDftrKNLuRjbDSpcrpjnRggSowLzy0k6N3Y4SJlxUuIiqQvRq404ids3H41TG_pXqocpM3KNAh7OR_u3ORje-2z4Cu_oYYzw1zk-OxzQn0DD4B-8KipYWZPCytfbVlD3MlFrUzdWPYiChJCOFbXzvtDvIyQt5lvjyLHI_7Pk2md4YQx-2O4O0L-5ZmDYCrk9a84yZl0q6HIBAK2HX9v-xRQOs5zueUwkNYYm1KDZBGxJUNAAYrTxerP',
  goa: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt1r_8_aGNR8qMj-9A92LQB1RY4chvhxJiqBsoZejhGPAsLWA7qCM-E7vnSUlhIYhaMwTzf5UEP9BnBI96EqU2sR7F06WLX4MfWgISB82kBuMLsUu_AIjTUCA3VGUpuGiKsVaiQ2e095AnO4vT90CNjo-ripS60v4Yq2_cD0U9u6TI5eff-5IB3IGpY2CqXkoKLy3TSjVYNn3KcuxsX2H-fL_3u34lMDm6yuyYetbtRl6597z3MBJD',
  kerala: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnhLdG3LPBTSdUm1_-ri87uMh27WsvF57HWV-D_vor9ld93tRg6oQh92MA-8Au6Sj5yvILlBAzfjwHZvdUkIvrTSADaWqjFKQT_1qDPPgFiJRUC5I2A0NRE9toJ0awOgJ4vPVqktIzcyO_BKkllcwkRf4dzzvmLdByseaGZomNwle3DtqljpNnsCnLEJTI4P9n8eOcK2RVY98bgqP1PXR1GMciQG8slnlNAwjjfcKDaj8AR2FatNmV',
  himalayas: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHz03uC18dcQUZJ6FaktNdeb-3XWbG9IgfsxxNiOtsai1m_bo0V1A0BfDS6MiT8yc75Vl33zyVuUmJi5zfSFG-V3-IVP8l6NAxm0RVt0ibxDLIzAZxnf6YxLyWkBv3k9RNEPVRp_A_QPhAzdnsS9I98ZlFVwgUHZ28aN43hAMkd8VaL298sIeHjeu0jvJ-53RlBvbSAoBardPvutRHatRHa2VVembYhDYKkfbMh4Pcb-CiFQEYaBC0',
  'himachal pradesh': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHz03uC18dcQUZJ6FaktNdeb-3XWbG9IgfsxxNiOtsai1m_bo0V1A0BfDS6MiT8yc75Vl33zyVuUmJi5zfSFG-V3-IVP8l6NAxm0RVt0ibxDLIzAZxnf6YxLyWkBv3k9RNEPVRp_A_QPhAzdnsS9I98ZlFVwgUHZ28aN43hAMkd8VaL298sIeHjeu0jvJ-53RlBvbSAoBardPvutRHatRHa2VVembYhDYKkfbMh4Pcb-CiFQEYaBC0',
  munnar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnhLdG3LPBTSdUm1_-ri87uMh27WsvF57HWV-D_vor9ld93tRg6oQh92MA-8Au6Sj5yvILlBAzfjwHZvdUkIvrTSADaWqjFKQT_1qDPPgFiJRUC5I2A0NRE9toJ0awOgJ4vPVqktIzcyO_BKkllcwkRf4dzzvmLdByseaGZomNwle3DtqljpNnsCnLEJTI4P9n8eOcK2RVY98bgqP1PXR1GMciQG8slnlNAwjjfcKDaj8AR2FatNmV'
}

const fallbackImage = destinationImages.udaipur

export function getHeroImage(destinationName) {
  const key = destinationName.toLowerCase().trim()
  return destinationImages[key] || fallbackImage
}

export function getSubtitle(destinationName) {
  const key = destinationName.toLowerCase().trim()
  if (key.includes('udaipur')) return 'City of Lakes · Royal Experiences'
  if (key.includes('goa')) return 'Sun, Sand & Coastal Retreat'
  if (key.includes('kerala')) return 'Tranquil Waters & Emerald Hills'
  if (key.includes('rajasthan')) return 'Grand Palaces & Desert Majesty'
  return 'Curated Highlights & Scenic Wonders'
}

export function buildFallbackStays(destinationName) {
  return [
    { tier: 'Budget-Friendly', description: `Simple, well-located places to stay near the heart of ${destinationName}.` },
    { tier: 'Mid-Range Comfort', description: `Comfortable hotels with solid amenities around ${destinationName}.` },
    { tier: 'Luxury Retreat', description: `High-end resorts and hotels for a premium stay in ${destinationName}.` }
  ]
}

// Builds a generic day-by-day plan based on how many days the user
// entered. This is still mock content (no real AI/backend yet — that's
// Phase 10) but it now actually reflects the destination and day count.
export function buildGeneratedPlan(destinationName, days) {
  const plan = []
  const total = Math.max(1, Number(days) || 1)

  for (let day = 1; day <= total; day++) {
    if (day === 1) {
      plan.push({
        day,
        title: 'Arrival & First Impressions',
        description: `Check in, settle in, and take a relaxed first look around ${destinationName}.`,
        foodHighlight: `Sample popular local dishes and street food around ${destinationName}.`
      })
    } else if (day === total && total > 1) {
      plan.push({
        day,
        title: 'Last Highlights & Departure',
        description: `A final morning to soak in ${destinationName} before checkout.`,
        foodHighlight: `Grab a final local specialty to go before you leave ${destinationName}.`
      })
    } else {
      plan.push({
        day,
        title: `Exploring ${destinationName}`,
        description: `A curated mix of sightseeing, local culture and downtime around ${destinationName}.`,
        foodHighlight: `Try a well-known regional dish typical of ${destinationName}.`
      })
    }
  }

  return plan
}