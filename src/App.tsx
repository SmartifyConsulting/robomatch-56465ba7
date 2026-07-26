import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useTheme } from './hooks'
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import CreateHandwriting from './pages/CreateHandwriting'
import HandwritingPreview from './pages/HandwritingPreview'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import FriendRequests from './pages/FriendRequests'
import NotFound from './pages/NotFound'

function App() {
  const { theme } = useTheme()

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          {/* Onboarding flow */}
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/create-handwriting" element={<CreateHandwriting />} />
          <Route path="/handwriting-preview" element={<HandwritingPreview />} />

          {/* Main app */}
          <Route path="/home" element={<Home />} />
          <Route path="/chat/:conversationId" element={<Chat />} />
          <Route path="/profile/:userId" element={<Profile />} />

          {/* Secondary screens */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/friend-requests" element={<FriendRequests />} />

          {/* Error pages */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
