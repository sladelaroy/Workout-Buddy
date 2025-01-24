import {useState} from 'react'
import {useSignup} from '../hooks/useSignup.jsx'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, isloading, error} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <>
        <form className='signup' onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

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

export default Signup
