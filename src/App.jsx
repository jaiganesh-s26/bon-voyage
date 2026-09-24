import { Routes, Route, useLocation } from 'react-router-dom'
import TopBar from './components/layout/TopBar.jsx'
import BottomNav from './components/layout/BottomNav.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import Toast from './components/common/Toast.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import MyTrips from './pages/MyTrips.jsx'
import Explore from './pages/Explore.jsx'
import Saved from './pages/Saved.jsx'
import Itinerary from './pages/Itinerary.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  const location = useLocation()
  const isItineraryPage = location.pathname.startsWith('/itinerary')
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
  const showChrome = !isItineraryPage && !isAuthPage

  return (
    <div className="app-shell">
      {showChrome && <Sidebar />}

      <div className="device-frame">
        {showChrome && <TopBar />}

        <div className="screens-viewport">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
            <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
            <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
            <Route path="/itinerary/:id" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>
        </div>

        {showChrome && <BottomNav />}
        <Toast />
      </div>
    </div>
  )
}

export default App