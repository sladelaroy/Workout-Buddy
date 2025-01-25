import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext.jsx'

import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import './index.css'

function App() {
  const [count, setCount] = useState(0)
  const {user} = useAuthContext();

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={user ? <HomePage /> : <Navigate to='/login' />} />
              <Route path="/about" element={<h1>About</h1>} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
