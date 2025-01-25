import {useState} from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext.jsx'
import { useAuthContext } from '../hooks/useAuthContext.jsx';

const WorkoutForm = () => {
  const {dispatch} = useWorkoutsContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState(0);
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyfields] = useState([]);
  const {user} = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must belogged in')
      return
    }

    const newWorkout = {
      title,
      load,
      reps
    }

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(newWorkout)
    })

    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
      setEmptyfields(json.emptyFields)
    } else {
      setTitle('');
      setLoad('');
      setReps('');
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }
  return (
    <>
      <div>
        <form className="create" onSubmit={handleSubmit}>
          <h3>Add a new Workout</h3>

          <label>Exercise Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={emptyFields.includes('title') ? 'error' : ''}/>

          <label>Load (kg)</label>
          <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} className={emptyFields.includes('load') ? 'error' : ''} />

          <label>Reps</label>
          <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className={emptyFields.includes('reps') ? 'error' : ''}/>

          <button type="submit">Add Workout</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </>
  )
}

export default WorkoutForm
