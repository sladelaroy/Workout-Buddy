import { useAuthContext } from "./useAuthContext.jsx"
import { useState } from "react"

export const useSignup = () => {
  const [error, setError] = useState('');
  const[isLoading, setIsLoading] = useState('');
  const {dispatch} = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)
    
    const response = await fetch("http://localhost:4000/api/users/signup", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error)
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: 'LOGIN', payload: json});

      setIsLoading(false)
    }

  }

  return {signup, isLoading, error}
}