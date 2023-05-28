import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function SignupUserLogin({ handleUserLoginInformation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pwMessage, setPwMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password) && password !== "") {
      setPwMessage(
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."
      );
    } else {
      setPwMessage(undefined);
    }
  }, [password]);

  return (
    <div>
      <form
        className="signup-container"
        onSubmit={(e) =>
          // Send user login information to sign up page
          handleUserLoginInformation(e, {
            email: email,
            password: password,
            username: username,
          })
        }
      >
        {/* Display sign up login information input fields */}
        <h1 className="signup-headline">Sign up</h1>
        <label className="labels">Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label className="labels">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />

        <label className="labels">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        {
          <div
            className="strong-password-message"
            style={{ display: pwMessage ? "flex" : "none" }}
          >
            {pwMessage}
          </div>
        }

        <button type="submit">Sign up</button>

        <p className="labels">Already have account?</p>
        <Link className="login-link" to={"/login"}>
          {" "}
          Log in
        </Link>
      </form>
    </div>
  );
}

SignupUserLogin.propTypes = {
  handleUserLoginInformation: PropTypes.func.isRequired,
};

export default SignupUserLogin;
