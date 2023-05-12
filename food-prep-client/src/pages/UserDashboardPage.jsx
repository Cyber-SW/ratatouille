import Navbar from "../components/Navbar"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import userService from "../services/user.service"


function UserDashboardPage() {
    const [userData, setUserData] = useState({})
    const [mealType, setMealType] = useState("")
    const [mealTime, setMealTime] = useState("")
    const [mealKcal, setMealKcal] = useState("")
    const [newMeal, setNewMeal] = useState("")
    const [receivedMeal, setReceivedMeal] = useState({})
    const [mealInformation, setMealInformation] = useState("")
    const [mealIngredients, setMealIngredients] = useState("")
    const [mealInstructions, setMealInstructions] = useState("")
    const [mealShoppingList, setMealShoppingList] = useState("")
    const [mealName, setMealName] = useState("")
    
    const { user } = useContext(AuthContext)

    const handleMealType = (e) => setMealType(e.target.value)
    const handleMealTime = (e) => setMealTime(e.target.value)
    const handleMealKcal = (e) => setMealKcal(e.target.value)


    function handleNewMealSubmit(e) {
        e.preventDefault()

        const mealConfiguration = 
        `You are a master chef working for years in different restaurants knowing everything about preparing meals and cooking. 
        
        Your task is to suggest a ${mealType} based on the following instructions.

        1. The meal must have around ${mealKcal} kcal.
        2. The meal must be ${userData.diet}.
        3. The maximum time to prepare and cook the ${mealType} is ${mealTime} in total.
        6. Do NOT include any of the following ingredients: ${userData.excludedIngredients}.
        7. Provide recipe and instructions for every meal.
        8. Always specify all units of measurement in grams and all units of temperature in °C.
        9. Always provide the name and the total kcal of the meal.
        10. Always provide the time it needs to prepare and cook the meal in total.
        11. Only suggest meals that have maximum 9 ingredients.
        12. Do NOT put paragraphs between the instructions.
        
        After you prepared the meal create a shopping list with all ingredients needed to cook that meal.`

        setNewMeal(mealConfiguration)
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
        if (user && newMeal) {
            userService.fetchUserMeal(user._id, newMeal)
                .then(response => {
                    setReceivedMeal(response.data)
            })
        }
    }, [newMeal])

    useEffect(() => {
        if (user && receivedMeal.choices && receivedMeal.choices.length > 0) {
            const mealSubstrings = receivedMeal.choices[0].text.split("\n\n")

            setMealInformation(mealSubstrings[1])
            setMealIngredients(mealSubstrings[2])
            setMealInstructions(mealSubstrings[3])
            setMealShoppingList(mealSubstrings[4])
        }
    }, [receivedMeal])

    console.log("received Meal", receivedMeal)
    console.log(mealInformation)
    console.log(mealIngredients)
    console.log(mealInstructions)
    console.log(mealShoppingList)

    useEffect(() => {
        if (user && mealInformation) {
            const mealName = mealInformation.match(/Meal Name:\s*(.*)\n/)[1]

            setMealName(mealName)
        }
    }, [mealInformation])

    console.log(mealName)

    return (
        <div>
            <Navbar />

            <h1>Dashboard</h1>

            <form onSubmit={handleNewMealSubmit}>
                <h2>Configure your meal</h2>
                <select name="dish type" id="dish-type" onChange={handleMealType}>
                    <option value={""} selected disabled hidden>Choose your meal type</option>
                    <option value={"breakfast"}>Breakfast</option>
                    <option value={"lunch"}>Lunch</option>
                    <option value={"dinner"}>Dinner</option>
                    <option value={"snack"}>Snack</option>
                </select>

                <select name="meal time" id="meal-time" onChange={handleMealTime}>
                    <option value={""} selected disabled hidden>Total time to prepare your meal</option>
                    <option value={"10 minutes"}>10 minutes</option>
                    <option value={"20 minutes"}>20 minutes</option>
                    <option value={"30 minutes"}>30 minutes</option>
                    <option value={"40 minutes"}>40 minutes</option>
                    <option value={"50 minutes"}>50 minutes</option>
                    <option value={"60 minutes"}>60 minutes</option>
                </select>

                <label>Minimum amount of calories</label>
                <input type="number" min="1" max="2000" name="meal kcal" value={mealKcal} onChange={handleMealKcal} />

                <button type="submit">Suggest meal</button>
            </form>

            <h2>Your meal suggestion</h2>




        </div>
    )
}

export default UserDashboardPage