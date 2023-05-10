import { useState } from "react"
import PropTypes from "prop-types"


function SignupUserInformation({ handleUserInformation }) {
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
    const [currentIngredient, setCurrentIngredient] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

  
    const handleGender = (e) => setGender(e.target.value)
    const handleAge = (e) => setAge(e.target.value)
    const handleGoal = (e) => setGoal(e.target.value)
    const handleDiet = (e) => setDiet(e.target.value)
    const handleBreakfastTime = (e) => setBreakfastTime(e.target.value)
    const handleLunchTime = (e) => setLunchTime(e.target.value)
    const handleDinnerTime = (e) => setDinnerTime(e.target.value)

    function handleAddIngredient() {
        if (currentIngredient && !excludedIngredients.includes(currentIngredient)) {
            setExcludedIngredients([...excludedIngredients, currentIngredient])
            setCurrentIngredient("")
        }
        if (excludedIngredients.includes(currentIngredient)) {
            setErrorMessage("This ingredient is already banned.")
        }
    }

    function handleSize (e) {
        setSize(e.target.value)

        if (e.target.value && weight) {
            const calculatedBmi = weight / (e.target.value / 100)**2
            setBmi((calculatedBmi).toFixed(2))
        }
    }

    function handleWeight(e) {
        setWeight(e.target.value)

        if (e.target.value && size) {
            const calculatedBmi = e.target.value / (size / 100)**2
            setBmi((calculatedBmi).toFixed(2))
        }
    } 
 
    function calculateCalorieDemand(e) {
        if (e.target.value === "Only sitting or lying / Frail people") {
            gender === "Female" ? setCalorieDemand(((0.9 * weight * 24) * 1.2).toFixed(0)) && setActivityLevel(e.target.value)
            : setCalorieDemand(((weight * 24) * 1.2).toFixed(0)) && setActivityLevel(e.target.value)
        } else if (e.target.value === "Sedentary, hardly any physical activity / Office work at the desk") {
            gender === "Female" ? setCalorieDemand(((0.9 * weight * 24) * 1.4).toFixed(0)) && setActivityLevel(e.target.value)
            : setCalorieDemand(((weight * 24) * 1.5).toFixed(0)) && setActivityLevel(e.target.value)
        } else if (e.target.value === "Predominantly sitting, walking and standing / Students, pupils, cab drivers") {
            gender === "Female" ? setCalorieDemand(((0.9 * weight * 24) * 1.6).toFixed(0)) && setActivityLevel(e.target.value)
            : setCalorieDemand(((weight * 24) * 1.7).toFixed(0)) && setActivityLevel(e.target.value)
        } else if (e.target.value === "Mainly standing and walking / Salesman, waiter, craftsman") {
            gender === "Female" ? setCalorieDemand(((0.9 * weight * 24) * 1.8).toFixed(0)) && setActivityLevel(e.target.value)
            : setCalorieDemand(((weight * 24) * 1.9).toFixed(0)) && setActivityLevel(e.target.value)
        } else if (e.target.value === "Physically demanding work / Farmers, high performance athletes") {
            gender === "Female" ? setCalorieDemand(((0.9 * weight * 24) * 2.2).toFixed(0)) && setActivityLevel(e.target.value)
            : setCalorieDemand(((weight * 24) * 2.4).toFixed(0)) && setActivityLevel(e.target.value)
        }
    }

    return (
        <div>
            <h1>Let´s specify your goal!</h1>

            <form onSubmit={() => handleUserInformation({
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
                })}>

                <h2>Gender:</h2>
                <input type="radio" name="gender" value="Male" onChange={handleGender} />
                <label>Male</label>
                <input type="radio" name="gender" value="Female" onChange={handleGender} />
                <label>Female</label>

                <label>Age in years:</label>
                <input type="number" min="1" max="99" name="age" value={age} onChange={handleAge} />

                <label>Size in centimeter:</label>
                <input type="number" min="100" max="250" name="size" value={size} onChange={handleSize} />

                <label>Weight in kilogram:</label>
                <input type="number" min="20" max="400" name="weight" value={weight} onChange={handleWeight} />

                <h2>Your BMI: {bmi ? bmi : "Type in your age, size and weight first."}</h2>
                <h2>{age > 18 && age < 25 && bmi > 18 && bmi < 25 ? "Your BMI is perfect, you should keep your weight." 
                : age > 18 && age < 25 && bmi < 19 ? "Your BMI is too low, You should increase your weight." 
                : age > 18 && age < 25 && bmi > 24 ? "You BMI is too high, You should decrease your weight." 
                : "" }</h2>
                {/* dont forget the missing conditionals */}

                <h2>What is your goal?</h2>
                <input type="radio" name="goal" value="Lose Weight" onChange={handleGoal} />
                <label>Lose Weight</label>
                <input type="radio" name="goal" value="Keep Weight" onChange={handleGoal} />
                <label>Keep Weight</label>
                <input type="radio" name="goal" value="Gain Weight" onChange={handleGoal} />
                <label>Gain Weight</label>

                <h2>What is your activity level?</h2>
                <select name="calorie demand" id="calorie-demand" onChange={calculateCalorieDemand}>
                    <option value="" selected disabled hidden>Please choose your activity level</option>
                    <option value="Only sitting or lying / Frail people">Only sitting or lying / Frail people</option>
                    <option value="Sedentary, hardly any physical activity / Office work at the desk">Sedentary, hardly any physical activity / Office work at the desk</option>
                    <option value="Predominantly sitting, walking and standing / Students, pupils, cab drivers">Predominantly sitting, walking and standing / Students, pupils, cab drivers</option>
                    <option value="Mainly standing and walking / Salesman, waiter, craftsman">Mainly standing and walking / Salesman, waiter, craftsman</option>
                    <option value="Physically demanding work / Farmers, high performance athletes">Physically demanding work / Farmers, high performance athletes</option>
                </select>

                <h2>Your calorie demand per day: {calorieDemand ? calorieDemand : "Choose your goal first."}</h2>

                <h2>What is your diet?</h2>
                <select name="diet" id="diet" onChange={handleDiet}>
                    <option value="" selected disabled hidden>Please choose your diet</option>
                    <option value="Low carb">Low carb</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="No preference">No preference</option>
                </select>

                <h2>How much time do you have to prepare your meals?</h2>
                <label>Maximum time to prepare breakfast</label>
                <select name="breakfast time" id="breakfast-time" onChange={handleBreakfastTime}>
                    <option value="">Please choose an option</option>
                    <option value="10 minutes">10 minutes</option>
                    <option value="20 minutes">20 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                </select>
                <label>Maximum time to prepare lunch</label>
                <select name="lunch time" id="lunch-time" onChange={handleLunchTime}>
                    <option value="" selected disabled hidden>Please choose an option</option>
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="60 minutes">60 minutes</option>
                </select>
                <label>Maximum time to prepare dinner</label>
                <select name="dinner time" id="dinner-time" onChange={handleDinnerTime}>
                    <option value="" selected disabled hidden>Please choose an option</option>
                    <option value="10 minutes">10 minutes</option>
                    <option value="20 minutes">20 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                </select>

                <h2>What ingredients should be banned from your plate?</h2>
                <input type="text" name="excludedIngredients" value={currentIngredient} onChange={(e) => setCurrentIngredient(e.target.value)} />
                <button type="button" onClick={handleAddIngredient}>Ban ingredient</button>

                <ul>
                    { excludedIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

                <button type="submit">Continue</button>
            </form>
            { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>
    )
}

SignupUserInformation.propTypes = {
    handleUserInformation: PropTypes.func.isRequired
  };

export default SignupUserInformation