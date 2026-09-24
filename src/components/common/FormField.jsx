// A labeled input box — matches the prototype's ".form-field" style.
// Reused anywhere we need a text or number input with a small label above it.
function FormField({ label, id, type = 'text', value, onChange, placeholder, min, max }) {
  return (
    <div className="form-field">
      <label className="field-label" htmlFor={id}>{label}</label>
      <input
        className="field-input"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </div>
  )
}

export default FormField