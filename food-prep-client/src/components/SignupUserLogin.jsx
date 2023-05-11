import { useState } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"


function SignupUserLogin({ handleUserLoginInformation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

  
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleUsername = (e) => setUsername(e.target.value)

    return (
        <div>
            <h1>Sign up</h1>

            <form onSubmit={(e) => handleUserLoginInformation(e, { email: email, password: password, username: username })}>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={handleEmail} />

                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePassword} />

                <label>Username:</label>
                <input type="text" name="username" value={username} onChange={handleUsername} />

                <button type="submit">Sign up</button>
            </form>

            { errorMessage && <p className="error-message">{errorMessage}</p> }

                <p>Already have account?</p>
                <Link to={"/login"}> Log in</Link>
        </div>
    )
}

SignupUserLogin.propTypes = {
    handleUserLoginInformation: PropTypes.func.isRequired
  };
  
export default SignupUserLogin