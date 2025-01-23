import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {WorkoutContextProvider} from './components/WorkoutContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
  </StrictMode>,
)
