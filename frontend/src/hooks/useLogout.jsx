import {useAuthContext} from './useAuthContext.jsx'
import {useWorkoutsContext} from './useWorkoutsContext.jsx'
export const useLogout = () => {
  const {dispatch} = useAuthContext()
  const {dispatch: workoutsDispatch} = useWorkoutsContext()
    const logout = () => {
      localStorage.removeItem('user')
      dispatch({type: 'LOGOUT'})
      workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
  }