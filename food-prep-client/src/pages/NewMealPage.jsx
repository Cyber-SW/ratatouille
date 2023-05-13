import Navbar from "../components/Navbar"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import userService from "../services/user.service"
import { Link } from "react-router-dom"


function UserDashboardPage() {
    const [userData, setUserData] = useState({})
    const [mealType, setMealType] = useState("")
    const [mealTime, setMealTime] = useState("")
    const [mealKcal, setMealKcal] = useState("")
    const [newMeal, setNewMeal] = useState("")
    const [receivedMeal, setReceivedMeal] = useState({})
    const [mealInformation, setMealInformation] = useState(JSON.parse(localStorage.getItem('mealInformation')))
    const [mealIngredients, setMealIngredients] = useState(JSON.parse(localStorage.getItem('mealIngredients')))
    const [mealInstructions, setMealInstructions] = useState(JSON.parse(localStorage.getItem('mealInstructions')))
    const [mealShoppingList, setMealShoppingList] = useState(JSON.parse(localStorage.getItem('mealShoppingList')))
    const [mealImage, setMealImage] = useState(JSON.parse(localStorage.getItem('mealImage')))
    const [splittedInformation, setSplittedInformation] = useState([])
    const [mealName, setMealName] = useState("")
    
    const { user } = useContext(AuthContext)

    const handleMealType = (e) => setMealType(e.target.value)
    const handleMealTime = (e) => setMealTime(e.target.value)
    const handleMealKcal = (e) => setMealKcal(e.target.value)


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
        10. Do NOT put paragraphs between the instructions.
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
        if (user && mealName) {
            userService.fetchMealImage(mealName)
                .then(response => {
                    setMealImage(response.data)
                })
        }
    }, [mealName])

    useEffect(() => {
        if (user && receivedMeal.length > 0) {
            const mealSubstrings = receivedMeal.split("\n\n")

            setMealInformation(mealSubstrings[0])
            setMealIngredients(mealSubstrings[1])
            setMealInstructions(mealSubstrings[2])
            setMealShoppingList(mealSubstrings[3])
        }
    }, [receivedMeal])

    useEffect(() => {
        localStorage.setItem("mealInformation", JSON.stringify(mealInformation))
        localStorage.setItem("mealIngredients", JSON.stringify(mealIngredients))
        localStorage.setItem("mealInstructions", JSON.stringify(mealInstructions))
        localStorage.setItem("mealShoppingList", JSON.stringify(mealShoppingList))
        localStorage.setItem("mealImage", JSON.stringify(mealImage))
    }, [mealInformation, mealIngredients, mealInstructions, mealShoppingList, mealImage])

    console.log("received Meal", receivedMeal)
    console.log(mealInformation)
    console.log(mealIngredients)
    console.log(mealInstructions)
    console.log(mealShoppingList)
    console.log("meal Picture: ", mealImage)

    useEffect(() => {
        if (user && mealInformation) {
            const mealName = mealInformation.match(/Meal name:\s*(.*)\n/)[1]
            const splittedInformation = mealInformation.split("\n").splice(0, 3)

            setMealName(mealName)
            setSplittedInformation(splittedInformation)
        }
    }, [mealInformation])


    console.log(mealName)

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

                <label>Minimum amount of calories</label>
                <input value={mealKcal} type="number" min="1" max="2000" name="meal kcal" onChange={handleMealKcal} />

                <button type="submit">Suggest meal</button>
            </form>

            <h2>Your meal suggestion</h2>

            {mealImage && splittedInformation.map((info, index) => (
                <h2 key={index}>{info}</h2>
            ))}

            { mealImage && <Link to="/meal-details"><img src={mealImage} alt="meal img" width={300} /></Link> }


        </div>
    )
}

export default UserDashboardPage