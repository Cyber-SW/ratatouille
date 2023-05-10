import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "./../services/auth.service"
import SignupUserLogin from "../components/SignupUserLogin"
import SignupUserInformation from "../components/SignupUserInformation"


function SignupPage() {
  //user login information
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  //user information
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [size, setSize] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState("")
  const [goal, setGoal] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [calorieDemand, setCalorieDemand] = useState("")
  const [diet, setDiet] = useState("")
  const [breakfastTime, setBreakfastTime] = useState("")
  const [lunchTime, setLunchTime] = useState("")
  const [dinnerTime, setDinnerTime] = useState("")
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
  const handleUserInformation = (userInformation) => {
    userInformation.preventDefault()

    setGender(userInformation.gender)
    setAge(userInformation.age)
    setSize(userInformation.size)
    setWeight(userInformation.weight)
    setBmi(userInformation.bmi)
    setGoal(userInformation.goal)
    setActivityLevel(userInformation.activityLevel)
    setCalorieDemand(userInformation.calorieDemand)
    setDiet(userInformation.diet)
    setBreakfastTime(userInformation.breakfastTime)
    setLunchTime(userInformation.lunchTime)
    setDinnerTime(userInformation.dinnerTime)
    setExcludedIngredients(userInformation.excludedIngredients)

    handleSignupSubmit()
  }
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();

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
      activityLevel: activityLevel,
      calorieDemand: calorieDemand,
      diet: diet,
      breakfastTime: breakfastTime,
      lunchTime: lunchTime,
      dinnerTime: dinnerTime,
      excludedIngredients: excludedIngredients
    }   

    console.log(userData)

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

      { errorMessage && <p className="error-message">{errorMessage}</p> }
    </div>
  )
}

export default SignupPage