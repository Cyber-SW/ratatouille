import Navbar from "../components/Navbar"
import { useState, useEffect, useContext } from "react"
import userService from "../services/user.service"
import { AuthContext } from "../context/auth.context"

function ProfilePage() {
    const { user } = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [usernameDb, setUsernameDb] = useState("")
    const [size, setSize] = useState("")
    const [weight, setWeight] = useState("")
    const [weightDb, setWeightDb] = useState("")
    const [goal, setGoal] = useState("")
    const [bmi, setBmi] = useState("")
    const [gender, setGender] = useState("")
    const [activityLevel, setActivityLevel] = useState("")
    const [storeCalorieDemand, setStoreCalorieDemand] = useState("")
    const [calorieDemand, setCalorieDemand] = useState("")
    const [diet, setDiet] = useState("")
    const [excludedIngredients, setExcludedIngredients] = useState([])
    const [excludedIngredientsDb, setExcludedIngredientsDb] = useState([])
    const [currentIngredient, setCurrentIngredient] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        if (user) {
            getUserData()
        }  
    }, [user])


    function getUserData() {
        userService.fetchUserData()
            .then((response) => {
                setUsernameDb(response.data.username)
                setBmi(response.data.bmi)
                setGender(response.data.gender)
                setExcludedIngredients(response.data.excludedIngredients)
                setDiet(response.data.diet)
                setGoal(response.data.goal)
                setActivityLevel(response.data.activityLevel)
                setSize(response.data.size)
                setWeightDb(response.data.weight)
            })
            .catch(err => console.log(err))
    }


    const handleDiet = (e) => setDiet(e.target.value)
    const handleCurrentIngredient = (e) => {
        setCurrentIngredient(e.target.value)
        setErrorMessage(undefined)
    }
    const handleUsername = (e) => setUsername(e.target.value)


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
    }, [goal, storeCalorieDemand])



    function handleWeight(e) {
        setWeight(e.target.value)

        if (e.target.value && size) {
            const calculatedBmi = e.target.value / (size / 100)**2
            setBmi((calculatedBmi).toFixed(2))
        }
    }

    
    function handleAddIngredient() {
        if (currentIngredient && !excludedIngredientsDb.includes(currentIngredient) && !excludedIngredients.includes(currentIngredient)) {
            setExcludedIngredients([...excludedIngredients, currentIngredient])
            setCurrentIngredient("")
        } else if (excludedIngredients.includes(currentIngredient)) {
            setErrorMessage("This ingredient is already banned!")
        } else if (excludedIngredientsDb.includes(currentIngredient)) {
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


    function handleDeleteIngredient(selectedIndex) {
        const filteredExcludedIngredients = excludedIngredients.filter((ingredient, index) => {
            return index !== selectedIndex
        })
        setExcludedIngredients(filteredExcludedIngredients)
    }


    function handleDeleteIngredientDb(selectedIndex) {
        const filteredExcludedIngredientsDb = excludedIngredientsDb.filter((ingredient, index) => {
            return index !== selectedIndex
        })
        setExcludedIngredientsDb(filteredExcludedIngredientsDb)
    }


    function handleUpdatedUserInformation(updatedInfo) {
        userService.updateUserProfile(updatedInfo)
    }


    return (
        <div>
            <Navbar />

            <form className="profile-container" onSubmit={() => handleUpdatedUserInformation({
                username: username,
                size: size,
                weight: weight,
                bmi: bmi,
                goal: goal,
                activityLevel: activityLevel,
                calorieDemand: calorieDemand,
                diet: diet,
                excludedIngredients: [...excludedIngredientsDb, ...excludedIngredients] 
                })}>

                <h1 className="shopping-list-headline">Change your informations</h1>

                <div className="profile-margin">
                    <label className="labels">Change your username:</label>
                    <input type="text" placeholder={usernameDb} value={username} onChange={handleUsername} />

                    <label className="labels">Change your weight:</label>
                    <input type="number" min="20" max="400" name="weight" placeholder={weightDb} value={weight} onChange={handleWeight} />
                </div>
                

                <h2 className="profile-margin">Your BMI: {bmi && size && weight ? bmi : "Type in your weight first."}</h2>

                <div className="profile-margin">
                    <label className="labels">Change your activity level:</label>
                    <select name="calorie demand" id="calorie-demand" onChange={calculateCalorieDemand} >
                        <option value={""} selected disabled hidden>{activityLevel && activityLevel}</option>
                        <option value={"Only sitting or lying"}>Only sitting or lying / Frail people</option>
                        <option value={"Sedentary, hardly any physical activity"}>Sedentary, hardly any physical activity / Office work at the desk</option>
                        <option value={"Predominantly sitting, walking and standing"}>Predominantly sitting, walking and standing / Students, pupils, cab drivers</option>
                        <option value={"Mainly standing and walking"}>Mainly standing and walking / Salesman, waiter, craftsman</option>
                        <option value={"Physically demanding work"}>Physically demanding work / Farmers, high performance athletes</option>
                    </select>
                </div>
                
                <div className="profile-margin">
                    <label className="labels">Change your goal:</label>
                    <hr />
                    <div className="goal-container">
                        <div className="alignment">
                            <label className="labels">Lose weight</label>
                            <input className="radio-input" type="radio" name="goal" value={"Lose weight"} checked={goal === "Lose weight"} onChange={handleGoal} />
                        </div>
                        
                        <div className="alignment">
                            <label className="labels">Keep weight</label>
                            <input className="radio-input" type="radio" name="goal" value={"Keep weight"} checked={goal === "Keep weight"} onChange={handleGoal} />
                        </div>
                        
                        <div className="alignment">
                            <label className="labels">Gain weight</label>
                            <input className="radio-input" type="radio" name="goal" value={"Gain weight"} checked={goal === "Gain weight"} onChange={handleGoal} />
                        </div>
                    </div>
                </div>

                <h2 className="profile-margin calorie-demand">New calorie demand per day: {calorieDemand && goal ? calorieDemand : "" }</h2>

                <div className="profile-margin">
                    <label className="labels">Change your diet:</label>
                    <select name="diet" id="diet" onChange={handleDiet}>
                        <option value={""} selected disabled hidden>{diet && diet.charAt(0).toUpperCase() + diet.slice(1)}</option>
                        <option value={"low carb"}>Low carb</option>
                        <option value={"vegetarian"}>Vegetarian</option>
                        <option value={"vegan"}>Vegan</option>
                        <option value={"any delicious"}>Any delicious</option>
                    </select>
                </div>
                
                <div className="profile-margin">
                    <label className="labels">Change banned ingredients:</label>
                    <input type="text" name="excludedIngredients" value={currentIngredient} onChange={handleCurrentIngredient} />
                    <button className="ban-btn red" type="button" onClick={handleAddIngredient}>Ban ingredient</button>
                    { errorMessage && <p className="error-message">{errorMessage}</p> }
                </div>
                
                <ul className="profile-margin">
                    { excludedIngredients && excludedIngredients.map((ingredient, index) => (
                        <div className="positioning" key={index}>
                            <p className="text">- {ingredient}</p>
                            <button className="delete-list-btn red" type="button" onClick={() => handleDeleteIngredient(index)}>Delete</button>
                        </div>
                       
                        ))}
                    { excludedIngredientsDb && excludedIngredientsDb.map((ingredient, index) => (
                        <div className="positioning" key={index}>
                            <p className="text">- {ingredient}</p>
                            <button className="delete-list-btn red" type="button" onClick={() => handleDeleteIngredientDb(index)}>Delete</button>
                        </div>
                    ))}
                </ul>

                <button type="submit">Save changes</button>
    
            </form>
        </div>
    )
}

export default ProfilePage