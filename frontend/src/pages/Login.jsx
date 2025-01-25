import {useState} from 'react'
import {useLogin} from '../hooks/useLogin.jsx'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, isloading, error} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <>
        <form className='login' onSubmit={handleSubmit}>
          <h3>Log in</h3>

          <label>Email:</label>
          <input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}} />

          <label>Password:</label>
          <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />

          <button disabled={isloading} type='submit'>Submit</button>
          {error && <div className='error'>{error} </div>}

        </form>
    </>
  )
}

export default Login
