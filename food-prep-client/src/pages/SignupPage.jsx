import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "./../services/auth.service"
import SignupUserLogin from "../components/SignupUserLogin"
import SignupUserInformation from "../components/SignupUserInformation"


function SignupPage(props) {
  //user login information
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  //user goal information
  const [gender, setGender] = useState("")
  const [age, setAge] = useState(0)
  const [size, setSize] = useState(0)
  const [weight, setWeight] = useState(0)
  const [bmi, setBmi] = useState(0)
  const [goal, setGoal] = useState("")
  const [calorieDemand, setCalorieDemand] = useState(0)

  //user preference information
  const [diet, setDiet] = useState("")
  const [time, setTime] = useState("")
  const [excludedIngredients, setExcludedIngredients] = useState([])

  //error handling
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate();

  //handle user login information
  const handleUserLoginInformation = (userLoginData) => {
    userLoginData.preventDefault()

    setEmail(userLoginData.email)
    setPassword(userLoginData.password)
    setUsername(userLoginData.username)
  }

  //handle user goal information
  const handleUserInformation = (userGoalData) => {
    userGoalData.preventDefault()

    setGender(userGoalData.gender)
    setAge(userGoalData.age)
    setSize(userGoalData.size)
    setWeight(userGoalData.weight)
    //calculate bmi and show it in the user interface then show calorie demand based on goal
    setBmi(bmi)
    setGoal(goal)
    setCalorieDemand(calorieDemand)
  }
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { preferences, time, excludedIngredients }

    setPreferences(preferences)
    setTime(time)
    setExcludedIngredients(excludedIngredients)

    const userData = {
      email: email,
      password: password,
      username: username,

      gender: gender,
      age: age,
      size: size,
      weight: weight,
      bmi: bmi,
      goal: goal,
      calorieDemand: calorieDemand,

      diet: diet,
      time: time,
      excludedIngredients: excludedIngredients
    }   

    authService.signup(userData)
      .then((response) => {
        navigate("/login")
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription)
      })
  };

  
  return (
    <div className="SignupPage">
      <SignupUserLogin handleUserLoginInformation={handleUserLoginInformation} />

      <SignupUserInformation handleUserInformation={handleUserInformation} />


      {/* <h1>Sign up</h1>

      <form onSubmit={handleSignupSubmit}>
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
      <Link to={"/login"}> Log in</Link> */}
    </div>
  )
}

export default SignupPage