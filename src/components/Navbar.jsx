import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (!confirm("Are you sure you wanna logout?")) {
        return;
      }

      await logout();
      navigate('/');
    } catch (error) {
      console.log('Logout error: ', error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>Facegram</Link>
        <div className="navbar-nav">
          {auth ? (
            <>
              <Link className="nav-link" to={`/profile/${auth?.id}`}>@{auth?.username}</Link>
              <button className="nav-link" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to={'/register'}>Register</Link>
              <Link className="nav-link" to={'/'}>Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}