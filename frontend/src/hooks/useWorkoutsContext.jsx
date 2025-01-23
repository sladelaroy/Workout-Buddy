import { workoutContext } from "../components/WorkoutContext.jsx"
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const context = useContext(workoutContext)
  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutContextProvider')
  }
  return context
}


