import { useState } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"


function SignupUserLogin({ handleUserLoginInformation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
  
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleUsername = (e) => setUsername(e.target.value)


    return (
        <div>
            <form className="signup-container" onSubmit={(e) => handleUserLoginInformation(e, { email: email, password: password, username: username })}>
            <h1 className="signup-headline">Sign up</h1>
                <label className="labels">Email:</label>
                <input type="email" name="email" value={email} onChange={handleEmail} />

                <label className="labels">Password:</label>
                <input type="password" name="password" value={password} onChange={handlePassword} />

                <label className="labels">Username:</label>
                <input type="text" name="username" value={username} onChange={handleUsername} />

                <button type="submit">Sign up</button>

                <p className="labels">Already have account?</p>
                <Link className="login-link" to={"/login"}> Log in</Link> 
            </form>
        </div>
    )
}

SignupUserLogin.propTypes = {
    handleUserLoginInformation: PropTypes.func.isRequired
  };
  
export default SignupUserLogin