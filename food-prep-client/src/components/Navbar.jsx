import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)



    return (
        <nav>
            <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } />

            {isLoggedIn && (
        <>
            {/* <NavLink></NavLink> */}
            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.username}</span>
        </>
      )}

            {!isLoggedIn && (
        <>
            <NavLink to="/signup"> <button>Sign up</button> </NavLink>
            <NavLink to="/login"> <button>Log in</button> </NavLink>
        </>
      )}
        </nav>
    )
}

export default Navbar