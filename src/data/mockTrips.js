// Mock trips for the My Trips page. Only "upcoming" trips exist for now,
// matching the original prototype (Past/Drafts show empty states).
const mockTrips = [
  {
    id: 't1',
    itineraryId: 'kerala-getaway',
    destination: 'Kerala Getaway',
    route: 'Munnar • Thekkady • Alleppey',
    days: 5,
    guests: 2,
    status: 'upcoming',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnhLdG3LPBTSdUm1_-ri87uMh27WsvF57HWV-D_vor9ld93tRg6oQh92MA-8Au6Sj5yvILlBAzfjwHZvdUkIvrTSADaWqjFKQT_1qDPPgFiJRUC5I2A0NRE9toJ0awOgJ4vPVqktIzcyO_BKkllcwkRf4dzzvmLdByseaGZomNwle3DtqljpNnsCnLEJTI4P9n8eOcK2RVY98bgqP1PXR1GMciQG8slnlNAwjjfcKDaj8AR2FatNmV'
  },
  {
    id: 't2',
    itineraryId: 'rajasthan-royale',
    destination: 'Rajasthan Royale',
    route: 'Jaipur • Udaipur • Jodhpur',
    days: 4,
    guests: 2,
    status: 'upcoming',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6McgPPaBbLyeJvsi3o0Rtl_YZMggPy2ya3PNuvguII4-KMa9n20Y-jjGhBqJDddGCrfLm5Ys1iE6AuOwD16kVZ1cXMYn_7ydgTlJsHUFmT_1eKjaHQ-UnVFFze8CUGk0MutkZTVvVXDctIiu_aP7QYHFY8-XuKU5ZApzSnjKf9eyXFpbhUWeqe1Cg8btGF3uT_OhU-S79Z3VB6AEU4Gll5BxBKY6tNHhsvr1voLHSN0BwEwE2wxWk'
  }
]

export default mockTrips