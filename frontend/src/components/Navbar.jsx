import { Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout.jsx'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
  return (
    <>
      <header>
        <div className="container">
          <Link to="/">
            <h1>Workout Buddy</h1>
          </Link>

          <nav>
            {user && 
            (<div>
              <p>Welcome {user.email}</p>
              <button onClick={handleClick}>
                Log out
              </button>
            </div>)
            }
            {!user && 
              (<div>
                <Link to="/login">
                  Login
                </Link>
                <Link to="/Signup">
                  Signup
                </Link> 
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

export default Navbar
