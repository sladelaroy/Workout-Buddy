import { useAuthContext } from "./useAuthContext.jsx"
import { useState } from "react"
import {backendUrl} from '../App.jsx'

export const useLogin = () => {
  const [error, setError] = useState('');
  const[isLoading, setIsLoading] = useState('');
  const {dispatch} = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    
    const response = await fetch(`${backendUrl}/api/users/login`, {
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

  return {login, isLoading, error}
}