import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { backendUrl } from "../App.jsx";
import axios from "axios";
const HomePage = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/workouts`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        dispatch({ type: "SET_WORKOUTS", payload: response.data });

        console.log(response.data);
      } catch (error) {
        console.error(
          "Error fetching workouts:",
          error.response?.data || error.message
        );
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);
  console.log(workouts);
  return (
    <>
      <div className="home">
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails workout={workout} key={workout._id} />
            ))}
        </div>
        <WorkoutForm />
      </div>
    </>
  );
};

export default HomePage;
