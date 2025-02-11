import { useAuthContext } from "./useAuthContext.jsx"
import { useState } from "react"
import { backendUrl } from "../App.jsx";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState('');
  const[isLoading, setIsLoading] = useState('');
  const {dispatch} = useAuthContext()

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
  
      const response = await axios.post(`${backendUrl}/api/users/login`, {
        email,
        password
      });
  
      const json = response.data; // No need to use `await` for `response.data`
  
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
  
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {login, isLoading, error}
}