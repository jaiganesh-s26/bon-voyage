// One row in the Saved list, with a heart button that toggles
// favorited state (handled by the parent Saved page).
function SavedRow({ item, onToggleFavorite }) {
  const { id, name, subtitle, imageUrl, favorited } = item

  return (
    <div className="saved-row">
      <div className="saved-thumb">
        <img src={imageUrl} alt={name} loading="lazy" />
      </div>
      <div className="saved-info">
        <b>{name}</b>
        <small>{subtitle}</small>
      </div>
      <button
        className={'fav-btn' + (favorited ? '' : ' unfaved')}
        onClick={() => onToggleFavorite(id)}
        aria-label="Toggle favourite"
      >
        {favorited ? '♥' : '♡'}
      </button>
    </div>
  )
}

export default SavedRow