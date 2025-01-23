import { createContext, useReducer } from 'react';

export const workoutContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_WORKOUT':
      return {
        ...state,
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      return { 
        workouts: state.workouts.filter((workout) => {workout._id !== action.payload._id}) 
      }
    case 'UPDATE_WORKOUT':
      const updatedWorkout = action.payload;
      const updatedWorkouts = state.workouts.map((workout) => {
        if (workout._id === updatedWorkout._id) {
          return updatedWorkout;
        }
        return workout;
      });
      return {
        ...state,
        workouts: updatedWorkouts,
      };
    case 'SET_WORKOUTS':
      return {
        ...state,
        workouts: action.payload,
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, { workouts: null });
  return (
    <workoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </workoutContext.Provider>
  );
}

