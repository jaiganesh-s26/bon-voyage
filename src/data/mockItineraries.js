// Preset itinerary content for the two starter trips in My Trips.
// New trips created via "Generate My Itinerary" get added to this
// same collection at runtime by AppContext.
const mockItineraries = {
  'rajasthan-royale': {
    id: 'rajasthan-royale',
    destination: 'Udaipur',
    vibe: 'Heritage',
    days: 4,
    guests: 2,
    subtitle: 'City of Lakes · Royal Experiences',
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6McgPPaBbLyeJvsi3o0Rtl_YZMggPy2ya3PNuvguII4-KMa9n20Y-jjGhBqJDddGCrfLm5Ys1iE6AuOwD16kVZ1cXMYn_7ydgTlJsHUFmT_1eKjaHQ-UnVFFze8CUGk0MutkZTVvVXDctIiu_aP7QYHFY8-XuKU5ZApzSnjKf9eyXFpbhUWeqe1Cg8btGF3uT_OhU-S79Z3VB6AEU4Gll5BxBKY6tNHhsvr1voLHSN0BwEwE2wxWk',
    summary: 'A relaxed royal getaway built around culture, lakes and local experiences.',
    plan: [
      { day: 1, title: 'Arrival & City Highlights', description: 'Hotel check-in → City Palace → Lake Pichola sunset boat ride → rooftop dinner' },
      { day: 2, title: 'Culture & Local Experiences', description: 'Jagdish Temple → Local market → Bagore Ki Haveli → Cultural evening' },
      { day: 3, title: 'Excursion & Nature', description: 'Saheliyon-ki-Bari → Sajjangarh Monsoon Palace → Lakeside café' },
      { day: 4, title: 'Shopping & Departure', description: 'Handicraft shopping → Brunch → Checkout' }
    ]
  },
  'kerala-getaway': {
    id: 'kerala-getaway',
    destination: 'Kerala',
    vibe: 'Relaxation',
    days: 5,
    guests: 2,
    subtitle: 'Tranquil Waters & Emerald Hills',
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnhLdG3LPBTSdUm1_-ri87uMh27WsvF57HWV-D_vor9ld93tRg6oQh92MA-8Au6Sj5yvILlBAzfjwHZvdUkIvrTSADaWqjFKQT_1qDPPgFiJRUC5I2A0NRE9toJ0awOgJ4vPVqktIzcyO_BKkllcwkRf4dzzvmLdByseaGZomNwle3DtqljpNnsCnLEJTI4P9n8eOcK2RVY98bgqP1PXR1GMciQG8slnlNAwjjfcKDaj8AR2FatNmV',
    summary: 'A slow-paced escape through backwaters, tea hills and coastal calm.',
    plan: [
      { day: 1, title: 'Arrival in Kochi', description: 'Hotel check-in → Fort Kochi walk → Sunset by the Chinese fishing nets' },
      { day: 2, title: 'Munnar Tea Hills', description: 'Drive to Munnar → Tea plantation tour → Viewpoint sunset' },
      { day: 3, title: 'Thekkady Wildlife', description: 'Periyar Wildlife Sanctuary → Spice plantation walk → Local dinner' },
      { day: 4, title: 'Alleppey Backwaters', description: 'Houseboat check-in → Backwater cruise → Onboard dinner' },
      { day: 5, title: 'Departure', description: 'Houseboat checkout → Local market → Airport transfer' }
    ]
  }
}

export default mockItineraries