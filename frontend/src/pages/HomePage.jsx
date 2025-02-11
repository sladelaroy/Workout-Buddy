import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm";
import {useWorkoutsContext} from '../hooks/useWorkoutsContext.jsx'
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import {backendUrl} from '../App.jsx'
const HomePage = () => {
  const {workouts, dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();

  useEffect(() => { 
    const fetchWorkouts = async () => {
      const response = await fetch(`${backendUrl}/api/workouts`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json()

      if (response.ok) {
        dispatch({type:'SET_WORKOUTS', payload: data})
      }

      console.log(data)
    }

    if (user) {
      fetchWorkouts() 
    }
    
  }, [dispatch, user])
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
