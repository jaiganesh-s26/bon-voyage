function ToggleSwitch({ checked, onChange, label, sublabel }) {
  return (
    <div className="switch-row">
      <div>
        <span className="switch-label-title">{label}</span>
        {sublabel && <span className="switch-label-sub">{sublabel}</span>}
      </div>
      <label className="ios-switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="ios-slider"></span>
      </label>
    </div>
  )
}

export default ToggleSwitch