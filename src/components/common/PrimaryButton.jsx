// The main solid-green call-to-action button style, reused across screens.
function PrimaryButton({ children, onClick, type = 'button' }) {
  return (
    <button className="btn-primary" type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default PrimaryButton