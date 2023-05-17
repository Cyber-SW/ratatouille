import { useEffect, useState } from "react"
import PropTypes from "prop-types"


function SignupUserInformation({ handleUserInformation }) {
    const [gender, setGender] = useState("")

    const [size, setSize] = useState("")
    const [weight, setWeight] = useState("")
    const [bmi, setBmi] = useState("")
    const [goal, setGoal] = useState("")
    const [activityLevel, setActivityLevel] = useState("")
    const [storeCalorieDemand, setStoreCalorieDemand] = useState("")
    const [calorieDemand, setCalorieDemand] = useState("")

    const [diet, setDiet] = useState("")
    const [excludedIngredients, setExcludedIngredients] = useState([])
    const [currentIngredient, setCurrentIngredient] = useState("")

    const [errorMessage, setErrorMessage] = useState(undefined)

  
    const handleGender = (e) => setGender(e.target.value)
    const handleDiet = (e) => setDiet(e.target.value)
    const handleCurrentIngredient = (e) => setCurrentIngredient(e.target.value)

    function handleGoal(e) {
        let total = parseInt(storeCalorieDemand)
        
        if (e.target.value === "Gain weight") {
            setCalorieDemand(total += 500)
            setGoal("Gain weight")
        } else if (e.target.value === "Lose weight") {
            setCalorieDemand(total -= 750)
            setGoal("Lose weight")
        } else {
            setCalorieDemand(total)
            setGoal("Keep weight")
        }
    }

    useEffect(() => {
        let total = parseInt(storeCalorieDemand)
        
        if (goal === "Gain weight") {
            setCalorieDemand(total += 500)
            setGoal("Gain weight")
        } else if (goal === "Lose weight") {
            setCalorieDemand(total -= 750)
            setGoal("Lose weight")
        } else {
            setCalorieDemand(total)
            setGoal("Keep weight")
        }
    }, [storeCalorieDemand])

    function handleSize(e) {
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
    
    function handleAddIngredient() {
        if (currentIngredient && !excludedIngredients.includes(currentIngredient)) {
            setExcludedIngredients([...excludedIngredients, currentIngredient])
            setCurrentIngredient("")
        }
        if (excludedIngredients.includes(currentIngredient)) {
            setErrorMessage("This ingredient is already banned.")
        }
    }
 
    function calculateCalorieDemand(e) {
        if (e.target.value === "Only sitting or lying / Frail people") {
            gender === "Female" ? setStoreCalorieDemand(((0.9 * weight * 24) * 1.2).toFixed(0))
            : setStoreCalorieDemand(((weight * 24) * 1.2).toFixed(0))
        } else if (e.target.value === "Sedentary, hardly any physical activity / Office work at the desk") {
            gender === "Female" ? setStoreCalorieDemand(((0.9 * weight * 24) * 1.4).toFixed(0))
            : setStoreCalorieDemand(((weight * 24) * 1.5).toFixed(0))
        } else if (e.target.value === "Predominantly sitting, walking and standing / Students, pupils, cab drivers") {
            gender === "Female" ? setStoreCalorieDemand(((0.9 * weight * 24) * 1.6).toFixed(0))
            : setStoreCalorieDemand(((weight * 24) * 1.7).toFixed(0))
        } else if (e.target.value === "Mainly standing and walking / Salesman, waiter, craftsman") {
            gender === "Female" ? setStoreCalorieDemand(((0.9 * weight * 24) * 1.8).toFixed(0))
            : setStoreCalorieDemand(((weight * 24) * 1.9).toFixed(0))
        } else if (e.target.value === "Physically demanding work / Farmers, high performance athletes") {
            gender === "Female" ? setStoreCalorieDemand(((0.9 * weight * 24) * 2.2).toFixed(0))
            : setStoreCalorieDemand(((weight * 24) * 2.4).toFixed(0))
        }
        setActivityLevel(e.target.value)
    }

    return (
        <div>
            <h1>Let´s specify your goal!</h1>

            <form onSubmit={(e) => handleUserInformation(e, {
                gender: gender,
                size: size,
                weight: weight,
                bmi: bmi,
                goal: goal,
                activityLevel: activityLevel,
                calorieDemand: calorieDemand,
                diet: diet,
                excludedIngredients: excludedIngredients 
                })}>

                <h2>Gender:</h2>
                <input type="radio" name="gender" value={"Male"} onChange={handleGender} />
                <label>Male</label>
                <input type="radio" name="gender" value={"Female"} onChange={handleGender} />
                <label>Female</label>

                <label>Size in centimeter:</label>
                <input type="number" min="100" max="250" name="size" value={size} onChange={handleSize} />

                <label>Weight in kilogram:</label>
                <input type="number" min="20" max="400" name="weight" value={weight} onChange={handleWeight} />

                <h2>What is your activity level?</h2>
                <select name="calorie demand" id="calorie-demand" onChange={calculateCalorieDemand}>
                    <option value={""} selected disabled hidden>Please choose your activity level</option>
                    <option value={"Only sitting or lying / Frail people"}>Only sitting or lying / Frail people</option>
                    <option value={"Sedentary, hardly any physical activity / Office work at the desk"}>Sedentary, hardly any physical activity / Office work at the desk</option>
                    <option value={"Predominantly sitting, walking and standing / Students, pupils, cab drivers"}>Predominantly sitting, walking and standing / Students, pupils, cab drivers</option>
                    <option value={"Mainly standing and walking / Salesman, waiter, craftsman"}>Mainly standing and walking / Salesman, waiter, craftsman</option>
                    <option value={"Physically demanding work / Farmers, high performance athletes"}>Physically demanding work / Farmers, high performance athletes</option>
                </select>

                <h2>What is your goal?</h2>
                <input type="radio" name="goal" value={"Lose weight"} onChange={handleGoal} />
                <label>Lose Weight</label>
                <input type="radio" name="goal" value={"Keep weight"} onChange={handleGoal} />
                <label>Keep Weight</label>
                <input type="radio" name="goal" value={"Gain weight"} onChange={handleGoal} />
                <label>Gain Weight</label>

                <h2>Your calorie demand per day: {calorieDemand && goal ? calorieDemand : "Choose your goal first."}</h2>

                <h2>What is your diet?</h2>
                <select name="diet" id="diet" onChange={handleDiet}>
                    <option value={""} selected disabled hidden>Please choose your diet</option>
                    <option value={"low carb"}>Low carb</option>
                    <option value={"vegetarian"}>Vegetarian</option>
                    <option value={"vegan"}>Vegan</option>
                    <option value={"any delicious"}>Any delicious</option>
                </select>

                <h2>What ingredients should be banned from your plate?</h2>
                <input type="text" name="excludedIngredients" value={currentIngredient} onChange={handleCurrentIngredient} />
                <button type="button" onClick={handleAddIngredient}>Ban ingredient</button>

                <ul>
                    { excludedIngredients && excludedIngredients.map((ingredient, index) => (
                        <p key={index}>- {ingredient}</p>
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