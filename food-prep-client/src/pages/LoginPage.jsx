import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "./../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/new-meal");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup-container">
      <h1 className="signup-headline">Log in</h1>

      <form onSubmit={handleLoginSubmit}>
        <label className="labels">Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label className="labels">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="labels">Do not have an account yet?</p>
      <Link className="login-link" to={"/signup"}>
        {" "}
        Sign up
      </Link>
    </div>
  );
}

export default LoginPage;
