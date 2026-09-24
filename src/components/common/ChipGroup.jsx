import Chip from './Chip.jsx'

// A row of Chips where only one can be selected at a time.
// `className` lets the same component style itself as either the
// wrapping "VACATION TYPE" chip row (default) or the horizontal
// "category-tabs" row used on Explore/My Trips/Saved.
function ChipGroup({ options, selected, onSelect, className = 'chips-scroll' }) {
  return (
    <div className={className}>
      {options.map((option) => (
        <Chip
          key={option}
          label={option}
          active={option === selected}
          onClick={() => onSelect(option)}
        />
      ))}
    </div>
  )
}

export default ChipGroup