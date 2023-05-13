import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)



    return (
        <nav>
            {/* <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } /> */}

            {isLoggedIn && (
        <>
            <div>
                <span>{user && user.username}</span>
            </div>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/new-meal">New Meal</NavLink>
                <NavLink to="/favorites">Favorites</NavLink>
                <NavLink to="/shopping-list">Shopping List</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <button onClick={logOutUser}>Logout</button>
            </div>
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