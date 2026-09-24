// Mock catalog for the Explore page — separate from Home's smaller
// "quick pick" list, since Explore needs category + keyword data for filtering.
const exploreDestinations = [
  {
    id: 'goa',
    name: 'Goa',
    category: 'beaches',
    badge: 'Beach',
    subtitle: 'Sun, Sand & More',
    keywords: ['goa', 'sun', 'sand', 'beach', 'coastal'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt1r_8_aGNR8qMj-9A92LQB1RY4chvhxJiqBsoZejhGPAsLWA7qCM-E7vnSUlhIYhaMwTzf5UEP9BnBI96EqU2sR7F06WLX4MfWgISB82kBuMLsUu_AIjTUCA3VGUpuGiKsVaiQ2e095AnO4vT90CNjo-ripS60v4Yq2_cD0U9u6TI5eff-5IB3IGpY2CqXkoKLy3TSjVYNn3KcuxsX2H-fL_3u34lMDm6yuyYetbtRl6597z3MBJD'
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    category: 'mountains',
    badge: 'Mountains',
    subtitle: 'Mountains & Serenity',
    keywords: ['himachal', 'pradesh', 'mountains', 'serenity', 'manali', 'shimla', 'hills'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHz03uC18dcQUZJ6FaktNdeb-3XWbG9IgfsxxNiOtsai1m_bo0V1A0BfDS6MiT8yc75Vl33zyVuUmJi5zfSFG-V3-IVP8l6NAxm0RVt0ibxDLIzAZxnf6YxLyWkBv3k9RNEPVRp_A_QPhAzdnsS9I98ZlFVwgUHZ28aN43hAMkd8VaL298sIeHjeu0jvJ-53RlBvbSAoBardPvutRHatRHa2VVembYhDYKkfbMh4Pcb-CiFQEYaBC0'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    category: 'heritage',
    badge: 'Heritage',
    subtitle: 'Royal Heritage',
    keywords: ['rajasthan', 'royal', 'heritage', 'desert', 'fort', 'jaipur', 'palace'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDftrKNLuRjbDSpcrpjnRggSowLzy0k6N3Y4SJlxUuIiqQvRq404ids3H41TG_pXqocpM3KNAh7OR_u3ORje-2z4Cu_oYYzw1zk-OxzQn0DD4B-8KipYWZPCytfbVlD3MlFrUzdWPYiChJCOFbXzvtDvIyQt5lvjyLHI_7Pk2md4YQx-2O4O0L-5ZmDYCrk9a84yZl0q6HIBAK2HX9v-xRQOs5zueUwkNYYm1KDZBGxJUNAAYrTxerP'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    category: 'beaches',
    badge: 'Backwaters',
    subtitle: 'Backwaters & Beyond',
    keywords: ['kerala', 'backwaters', 'beyond', 'alleppey', 'waterways', 'ayurveda'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnhLdG3LPBTSdUm1_-ri87uMh27WsvF57HWV-D_vor9ld93tRg6oQh92MA-8Au6Sj5yvILlBAzfjwHZvdUkIvrTSADaWqjFKQT_1qDPPgFiJRUC5I2A0NRE9toJ0awOgJ4vPVqktIzcyO_BKkllcwkRf4dzzvmLdByseaGZomNwle3DtqljpNnsCnLEJTI4P9n8eOcK2RVY98bgqP1PXR1GMciQG8slnlNAwjjfcKDaj8AR2FatNmV'
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    category: 'heritage',
    badge: 'Royal Lakes',
    subtitle: 'City of Lakes',
    keywords: ['udaipur', 'city', 'lakes', 'royal', 'palace', 'rajasthan', 'pichola'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6McgPPaBbLyeJvsi3o0Rtl_YZMggPy2ya3PNuvguII4-KMa9n20Y-jjGhBqJDddGCrfLm5Ys1iE6AuOwD16kVZ1cXMYn_7ydgTlJsHUFmT_1eKjaHQ-UnVFFze8CUGk0MutkZTVvVXDctIiu_aP7QYHFY8-XuKU5ZApzSnjKf9eyXFpbhUWeqe1Cg8btGF3uT_OhU-S79Z3VB6AEU4Gll5BxBKY6tNHhsvr1voLHSN0BwEwE2wxWk'
  },
  {
    id: 'munnar',
    name: 'Munnar',
    category: 'mountains',
    badge: 'Tea Hills',
    subtitle: 'Tea Gardens',
    keywords: ['munnar', 'tea', 'gardens', 'hills', 'greenery', 'kerala', 'mist'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnhLdG3LPBTSdUm1_-ri87uMh27WsvF57HWV-D_vor9ld93tRg6oQh92MA-8Au6Sj5yvILlBAzfjwHZvdUkIvrTSADaWqjFKQT_1qDPPgFiJRUC5I2A0NRE9toJ0awOgJ4vPVqktIzcyO_BKkllcwkRf4dzzvmLdByseaGZomNwle3DtqljpNnsCnLEJTI4P9n8eOcK2RVY98bgqP1PXR1GMciQG8slnlNAwjjfcKDaj8AR2FatNmV'
  }
]

export default exploreDestinations