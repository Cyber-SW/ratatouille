import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import authService from "./../services/auth.service"
import SignupUserLogin from "../components/SignupUserLogin"
import SignupUserInformation from "../components/SignupUserInformation"


function SignupPage() {
  //user login information
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  //toggle form
  const [toggleForm, setToggleForm] = useState(false)

  //token handling
  const { storeToken, authenticateUser } = useContext(AuthContext)

  //error handling
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate();

  //handle user login information
  const handleUserLoginInformation = (e, userLoginData) => {
    e.preventDefault()

    setEmail(userLoginData.email)
    setPassword(userLoginData.password)
    setUsername(userLoginData.username)
    setToggleForm(true)
  }

  //handle user information
  const handleUserInformation = (e, userInformation) => {
    e.preventDefault()

    const userData = {
      email: email,
      password: password,
      username: username,
      gender: userInformation.gender,
      age: userInformation.age,
      size: userInformation.size,
      weight: userInformation.weight,
      bmi: userInformation.bmi,
      goal: userInformation.goal.toString(),
      activityLevel: userInformation.activityLevel,
      calorieDemand: userInformation.calorieDemand,
      diet: userInformation.diet,
      breakfastTime: userInformation.breakfastTime,
      lunchTime: userInformation.lunchTime,
      dinnerTime: userInformation.dinnerTime,
      excludedIngredients: userInformation.excludedIngredients
    }   

    console.log("user data", userData)

    authService.signup(userData)
      .then(() => {
        authService.login({email: userData.email, password: userData.password})
          .then((response) => {
            console.log("JWT token", response.data.authToken)
            
            storeToken(response.data.authToken)
            authenticateUser()
            navigate("/dashboard")
          })
          .catch((error) => {
            const errorDescription = error.response.data.message
            setErrorMessage(errorDescription)
        })
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription)
      })
  }
  
  return (
    <div className="SignupPage">
      { !toggleForm && <SignupUserLogin handleUserLoginInformation={handleUserLoginInformation} /> }

      { toggleForm && <SignupUserInformation handleUserInformation={handleUserInformation} /> }

      { errorMessage && <p className="error-message">{errorMessage}</p> }
    </div>
  )
}

export default SignupPage