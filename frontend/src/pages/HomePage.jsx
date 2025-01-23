import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext.jsx'


const HomePage = () => {
  const {workouts, dispatch} = useWorkoutsContext();

  useEffect(() => { 
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts');
      const data = await response.json()

      if (response.ok) {
        dispatch({type:'SET_WORKOUTS', payload: data})
      }

      console.log(data)
    }

    fetchWorkouts()
    
  }, [dispatch])
    console.log(workouts)
  return (
    <>
      <div className="home">
        <div className="workouts">
          {workouts && workouts.map(workout => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
        </div>
        <WorkoutForm />
      </div>
    </>
  )
}

export default HomePage
