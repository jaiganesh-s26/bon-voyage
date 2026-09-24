import { useApp } from '../../context/AppContext.jsx'

// Rendered once, globally, in App.jsx — reads its message from
// shared Context so any page can trigger it via showToast().
function Toast() {
  const { toast } = useApp()

  return (
    <div className={'toast-modal' + (toast.visible ? ' show' : '')}>
      <span>{toast.icon}</span>
      <span>{toast.message}</span>
    </div>
  )
}

export default Toast