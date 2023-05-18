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
    const handleCurrentIngredient = (e) => {
        setCurrentIngredient(e.target.value)
        setErrorMessage(undefined)
    }

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
            setErrorMessage("This ingredient is already banned!")
        }
    }
 
    function calculateCalorieDemand(e) {
        if (e.target.value === "Only sitting or lying") {
            gender === "Female" ? setStoreCalorieDemand(((0.9 * weight * 24) * 1.2).toFixed(0))
            : setStoreCalorieDemand(((weight * 24) * 1.2).toFixed(0))
        } else if (e.target.value === "Sedentary, hardly any physical activity") {
            gender === "Female" ? setStoreCalorieDemand(((0.9 * weight * 24) * 1.4).toFixed(0))
            : setStoreCalorieDemand(((weight * 24) * 1.5).toFixed(0))
        } else if (e.target.value === "Predominantly sitting, walking and standing") {
            gender === "Female" ? setStoreCalorieDemand(((0.9 * weight * 24) * 1.6).toFixed(0))
            : setStoreCalorieDemand(((weight * 24) * 1.7).toFixed(0))
        } else if (e.target.value === "Mainly standing and walking") {
            gender === "Female" ? setStoreCalorieDemand(((0.9 * weight * 24) * 1.8).toFixed(0))
            : setStoreCalorieDemand(((weight * 24) * 1.9).toFixed(0))
        } else if (e.target.value === "Physically demanding work") {
            gender === "Female" ? setStoreCalorieDemand(((0.9 * weight * 24) * 2.2).toFixed(0))
            : setStoreCalorieDemand(((weight * 24) * 2.4).toFixed(0))
        }
        setActivityLevel(e.target.value)
    }

    return (
        <div>
            <form className="profile-container" onSubmit={(e) => handleUserInformation(e, {
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

                <h1 className="shopping-list-headline">Set your goals</h1>
                <h2 className="subline-signup-info">Don´t worry you can change your settings at any time in your profile</h2>

                <div className="profile-margin">
                    <label className="labels">Choose your gender:</label>
                    <hr />
                    <div className="goal-container">
                        <div className="alignment">
                            <label className="labels">Male</label>
                            <input className="radio-input" type="radio" name="gender" value={"Male"} onChange={handleGender} />
                        </div>
                        
                        <div className="alignment">
                            <label className="labels">Female</label>
                            <input className="radio-input" type="radio" name="gender" value={"Female"} onChange={handleGender} />
                        </div>
                    </div>
                </div>
                
                <div className="profile-margin">
                    <label className="labels">Size in centimeter:</label>
                    <input type="number" min="100" max="250" name="size" value={size} onChange={handleSize} />

                    <label className="labels">Weight in kilogram:</label>
                    <input type="number" min="20" max="400" name="weight" value={weight} onChange={handleWeight} />
                </div>
                
                <div className="profile-margin">
                    <label className="labels">Choose your activity level:</label>
                    <select name="calorie demand" id="calorie-demand" onChange={calculateCalorieDemand}>
                        <option value={""} selected disabled hidden>Please choose your activity level</option>
                        <option value={"Only sitting or lying"}>Only sitting or lying / Frail people</option>
                        <option value={"Sedentary, hardly any physical activity"}>Sedentary, hardly any physical activity / Office work at the desk</option>
                        <option value={"Predominantly sitting, walking and standing"}>Predominantly sitting, walking and standing / Students, pupils, cab drivers</option>
                        <option value={"Mainly standing and walking"}>Mainly standing and walking / Salesman, waiter, craftsman</option>
                        <option value={"Physically demanding work"}>Physically demanding work / Farmers, high performance athletes</option>
                    </select>
                </div>
                

                <div className="profile-margin">
                    <label className="labels">Define your goal:</label>
                    <hr />
                    <div className="goal-container">
                        <div className="alignment">
                            <label className="labels">Lose weight</label>
                            <input className="radio-input" type="radio" name="goal" value={"Lose weight"} onChange={handleGoal} />
                        </div>
                        <div className="alignment">
                            <label className="labels">Keep weight</label>
                            <input className="radio-input" type="radio" name="goal" value={"Keep weight"} onChange={handleGoal} />
                        </div>
                        <div className="alignment">
                            <label className="labels">Gain weight</label>
                            <input className="radio-input" type="radio" name="goal" value={"Gain weight"} onChange={handleGoal} />
                        </div>
                    </div>
                </div>
                

                <h2 className="profile-margin calorie-demand">Daily calorie goal: {calorieDemand && goal ? calorieDemand : "Choose your goal first."}</h2>

                <div className="profile-margin">
                    <label className="labels">Select your diet:</label>
                    <select name="diet" id="diet" onChange={handleDiet}>
                        <option value={""} selected disabled hidden>Please choose your diet</option>
                        <option value={"low carb"}>Low carb</option>
                        <option value={"vegetarian"}>Vegetarian</option>
                        <option value={"vegan"}>Vegan</option>
                        <option value={"any delicious"}>Any delicious</option>
                    </select>
                </div>
                
                <div className="profile-margin">
                    <label className="labels">Ban ingredients from your plate:</label>
                    <input type="text" name="excludedIngredients" value={currentIngredient} onChange={handleCurrentIngredient} />
                    <button className="ban-btn red" type="button" onClick={handleAddIngredient}>Ban ingredient</button>
                    { errorMessage && <p className="error-message">{errorMessage}</p> }
                </div>
                

                <ul className="profile-margin">
                    { excludedIngredients && excludedIngredients.map((ingredient, index) => (
                        <div className="positioning" key={index}>
                            <p className="text">- {ingredient}</p>
                        </div>
                    ))}
                </ul>

                <button type="submit">Continue</button>
            </form>
        </div>
    )
}

SignupUserInformation.propTypes = {
    handleUserInformation: PropTypes.func.isRequired
  };

export default SignupUserInformation