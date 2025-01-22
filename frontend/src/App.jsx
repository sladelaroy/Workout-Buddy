import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<h1>About</h1>} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
