import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import FriendRequests from './pages/FriendRequests'
import './App.css'

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Use the navigation to open Friend Requests.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{display: 'flex', gap: 12, paddingBottom: 12}}>
        <Link to="/">Home</Link>
        <Link to="/friend-requests">Friend Requests</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/friend-requests" element={<FriendRequests/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
