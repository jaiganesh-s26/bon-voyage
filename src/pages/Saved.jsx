import { useState } from 'react'
import ChipGroup from '../components/common/ChipGroup.jsx'
import SavedRow from '../components/saved/SavedRow.jsx'
import { useApp } from '../context/AppContext.jsx'

const tabs = ['All', 'Destinations', 'Stays', 'Experiences']
const tabToType = { All: 'all', Destinations: 'destination', Stays: 'stay', Experiences: 'experience' }

function Saved() {
  const { savedItems, toggleFavorite, showToast } = useApp()
  const [activeTab, setActiveTab] = useState('All')

  const type = tabToType[activeTab]
  const filteredItems = type === 'all' ? savedItems : savedItems.filter((item) => item.type === type)

  function handleToggle(id) {
    const item = savedItems.find((i) => i.id === id)
    toggleFavorite(id)
    if (item) {
      showToast(
        item.favorited ? 'Removed ' + item.name + ' from Saved' : 'Saved ' + item.name + ' to favourites ♥',
        item.favorited ? '♡' : '♥'
      )
    }
  }

  return (
    <section className="screen">
      <h1 className="page-title">Saved</h1>
      <p className="page-sub">Keep your favourite destinations, stays and experiences for later.</p>

      <ChipGroup options={tabs} selected={activeTab} onSelect={setActiveTab} className="category-tabs" />

      <div className="saved-list">
        {filteredItems.map((item) => (
          <SavedRow key={item.id} item={item} onToggleFavorite={handleToggle} />
        ))}
      </div>
    </section>
  )
}

export default Saved