import Navbar from "../components/Navbar"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { DataStorageContext } from "../context/dataStorage.context"
import userService from "../services/user.service"
import { Link } from "react-router-dom"


function NewMealPage() {
    const [userData, setUserData] = useState({})
    const [mealType, setMealType] = useState("")
    const [mealTime, setMealTime] = useState("")
    const [mealKcal, setMealKcal] = useState("")
    const [newMeal, setNewMeal] = useState("")
    const [goalDemand, setGoalDemand] = useState("")
    const [splittedInformation, setSplittedInformation] = useState([])
    
    const { user } = useContext(AuthContext)
    const { storedMealInformation, storedMealImage, handleDataStorage } = useContext(DataStorageContext)

    const handleMealType = (e) => setMealType(e.target.value)
    const handleMealTime = (e) => setMealTime(e.target.value)
    const handleMealKcal = (e) => setMealKcal(e.target.value)

    useEffect(() => {
        const goalDemand = (mealKcal * 100) / userData.calorieDemand
        setGoalDemand(goalDemand.toFixed(0))
    }, [mealKcal])
    // console.log("STORED MEAL INFORMATION", storedMealInformation)
    // console.log("STORED IMAGE", storedMealImage)


    function handleNewMealSubmit(e) {
        e.preventDefault()

        const mealConfiguration = 
        `You are a master chef working for years in different restaurants knowing thousands of meals and everything about preparing them.
        
        Your task is to suggest a ${mealType} based on the following instructions.

        1. The ${mealType} must have around ${mealKcal} kcal.
        2. The ${mealType} must be ${userData.diet} ${mealType}.
        3. The maximum time to prepare and cook the ${mealType} is ${mealTime} in total.
        4. Do NOT include any of the following ingredients: ${userData.excludedIngredients}.
        5. Provide recipe and instructions for the ${mealType}.
        6. All units of measurement must be expressed in grams or ml for fluids and all units of temperature in °C.
        7. Always provide the name and the total kcal of the ${mealType}.
        8. Always provide the time it needs to prepare and cook the ${mealType} in total.
        9. Only suggest ${mealType} that has a maximum of 9 ingredients.
        10. Do NOT put paragraphs between the instructions, the Meal name, Total kcal or Total time.
        11. After you prepared the ${mealType} create a shopping list with all ingredients needed to prepare that ${mealType}.
        12. Your answer must always be formatted like this:

        Meal name:
        Total kcal:
        Total time:

        Ingredients:
        -
        -

        Instructions:
        1.
        2.

        Shopping list:
        -
        -
        
        `

        setNewMeal(mealConfiguration)
        setMealTime("")
        setMealType("")
        setMealKcal("")
    }

    useEffect(() => {
        if (newMeal !== "") {
            apiCall()
        }
    }, [newMeal])


    async function apiCall() {
        console.log("test", newMeal)
        try {
            const receivedMeal = await userService.fetchUserMeal(user._id, newMeal)
            const mealSubstrings = receivedMeal.data.split("\n\n")
            const mealName = mealSubstrings[0].match(/Meal name:\s*(.*)\n/)[1]
            const mealImage = await userService.fetchMealImage(mealName)
            await handleDataStorage({
                mealInformation: mealSubstrings[0],
                mealIngredients: mealSubstrings[1],
                mealInstructions: mealSubstrings[2],
                mealShoppingList: mealSubstrings[3],
                mealImage: mealImage.data
            })
        }
        catch (error) { 
            console.log(error)
        }
    }
    

    useEffect(() => {
        if (user) {
            userService.fetchUserData(user._id)
                .then(response => {
                    setUserData(response.data)
            })
        }
    }, [user])


    useEffect(() => {
        if (user && storedMealInformation) {
            const splittedInformation = storedMealInformation.split("\n").splice(0, 3)

            setSplittedInformation(splittedInformation)
        }
    }, [storedMealInformation])


    return (
        <div>
            <Navbar />

            <h1>New Meal</h1>

            <form onSubmit={handleNewMealSubmit}>
                <h2>Configure your meal</h2>
                <select value={mealType} name="meal type" id="meal-type" onChange={handleMealType}>
                    <option value={""} selected disabled hidden>Choose your meal type</option>
                    <option value={"breakfast"}>Breakfast</option>
                    <option value={"lunch"}>Lunch</option>
                    <option value={"dinner"}>Dinner</option>
                    <option value={"snack"}>Snack</option>
                </select>

                <select value={mealTime} name="meal time" id="meal-time" onChange={handleMealTime}>
                    <option value={""} selected disabled hidden>Max time to prepare your meal</option>
                    <option value={"5 minutes"}>5 minutes</option>
                    <option value={"10 minutes"}>10 minutes</option>
                    <option value={"15 minutes"}>15 minutes</option>
                    <option value={"20 minutes"}>20 minutes</option>
                    <option value={"30 minutes"}>30 minutes</option>
                    <option value={"40 minutes"}>40 minutes</option>
                    <option value={"50 minutes"}>50 minutes</option>
                </select>

                <h2>~ Amount of calories</h2>
                <input value={mealKcal} type="number" min="1" max="2000" name="meal kcal" onChange={handleMealKcal} />
                <h2>This is {goalDemand}% of your daily calorie demand</h2>

                <button type="submit">Suggest meal</button>
            </form>

            <h2>Your meal suggestion</h2>

            {storedMealImage && splittedInformation && splittedInformation.map((info, index) => (
                <h2 key={index}>{info}</h2>
            ))}

            { storedMealImage && splittedInformation && <Link to="/meal-details"><img src={storedMealImage} alt="meal img" width={300} /></Link> }


        </div>
    )
}


export default NewMealPage