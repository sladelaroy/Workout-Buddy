import { useAuthContext } from "./useAuthContext.jsx";
import { useState } from "react";
import { backendUrl } from "../App.jsx";
import axios from "axios";
export const useSignup = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
  
      const response = await axios.post(`${backendUrl}/api/users/signup`, {
        email,
        password
      });
      const res = response.data
  
      localStorage.setItem("user", JSON.stringify(res));
      dispatch({ type: "LOGIN", payload: res });
  
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
