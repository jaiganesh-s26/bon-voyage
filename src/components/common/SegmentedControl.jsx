function SegmentedControl({ options, selected, onSelect }) {
  return (
    <div className="segmented-control">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={'segment-btn' + (option === selected ? ' active' : '')}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default SegmentedControl