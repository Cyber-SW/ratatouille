import Navbar from "../components/Navbar"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import userService from "../services/user.service"
import { Link } from "react-router-dom"
import PacmanLoader from "react-spinners/PacmanLoader";


function NewMealPage() {
    const { user } = useContext(AuthContext)

    const [loading, setLoading] = useState(false);
    const [appState, setAppState] = useState({})
    const [mealType, setMealType] = useState("")
    const [mealTime, setMealTime] = useState("")
    const [mealKcal, setMealKcal] = useState("")
    const [newMeal, setNewMeal] = useState("")
    const [mealInformation, setMealInformation] = useState("")
    const [mealImage, setMealImage] = useState("")
    const [diet, setDiet] = useState("")
    const [excludedIngredients, setExcludedIngredients] = useState("")
    const [splittedInformation, setSplittedInformation] = useState([])
    const [errorMessage, setErrorMessage] = useState(undefined)
    

    const handleMealType = (e) => setMealType(e.target.value)
    const handleMealTime = (e) => setMealTime(e.target.value)
    const handleMealKcal = (e) => {
        setMealKcal(e.target.value)
        setErrorMessage(undefined)
    }

    useEffect(() => {
        setLoading(false)
    }, [appState])
    

    function handleNewMealSubmit(e) {
        e.preventDefault()

        const mealConfiguration = 
        `You are a master chef working for years in different restaurants knowing thousands of meals and everything about preparing them.
        
        Your task is to suggest a ${mealType} based on the following instructions.

        1. The ${mealType} must have around ${mealKcal} kcal.
        2. The ${mealType} must be ${diet} ${mealType}.
        3. The maximum time to prepare and cook the ${mealType} is ${mealTime} in total.
        4. Do NOT include any of the following ingredients: ${excludedIngredients}.
        5. Provide recipe and instructions for the ${mealType}.
        6. All units of measurement must be expressed in grams or ml for fluids and all units of temperature in °C.
        7. Always provide the name and the total kcal of the ${mealType}.
        8. Always provide the time it needs to prepare and cook the ${mealType} in total.
        9. Only suggest ${mealType} that has a maximum of 9 ingredients.
        10. Do NOT put paragraphs between the Instructions.
        11. Do NOT put paragraphs between the first 3 lines.
        12. After you prepared the ${mealType} create a shopping list with all ingredients needed to prepare that ${mealType}.
        13. Your answer must always be formatted like this:

        Meal name:
        Kcal:
        Time:

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
        setLoading(true)
    }


    useEffect(() => {
        if (user) {
            getUserData()
        }  
    }, [appState])


    function getUserData() {
        userService.fetchUserData()
            .then((response) => {
                setMealInformation(response.data.appState.mealInformation)
                setMealImage(response.data.appState.mealImage)
                setExcludedIngredients(response.data.excludedIngredients)
                setDiet(response.data.diet)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        if (newMeal !== "") {
            apiCall()
        }
    }, [newMeal])


    async function apiCall() {
        try {
            const receivedMeal = await userService.fetchUserMeal(newMeal)
            const mealSubstrings = receivedMeal.data.split("\n\n")
            const mealName = mealSubstrings[0].match(/Meal name:\s*(.*)\n/)[1]
            const mealImage = await userService.fetchMealImage(mealName)
            handleDataStorage({
                mealInformation: mealSubstrings[0],
                mealIngredients: mealSubstrings[1],
                mealInstructions: mealSubstrings[2],
                mealShoppingList: mealSubstrings[3],
                mealImage: mealImage.data
            })
        }
        catch (error) { 
            setErrorMessage("Oops your food is burnt unfortunately, please try again!")
            console.log(error)
        }
    }


    const handleDataStorage = (newMealData) => {
        const appState = {
            mealInformation: newMealData.mealInformation,
            mealIngredients: newMealData.mealIngredients,
            mealInstructions: newMealData.mealInstructions,
            mealShoppingList: newMealData.mealShoppingList,
            mealImage: newMealData.mealImage
        }
        setAppState(appState)
        userService.storeUserAppState(appState)
            .then((message) => console.log(message))
            .catch(err => console.log(err))
    }
    

    useEffect(() => {
        if (user && mealInformation) {
            const splittedInformation = mealInformation.split("\n").splice(0, 3)
            const newSplittedInfromation = splittedInformation.map((item) => item.replace("Meal name: ", "").replace(/(Time:\s*.+).*/, '$1').replace(/(Kcal:\s*\d+).*/, '$1'))

            setSplittedInformation(newSplittedInfromation)
        }
    }, [user, mealInformation])


    return (
        <div>
            <Navbar />
            <div className="username">Hello {user && user.username} nice to see you💚</div>

            <form className="form-container" onSubmit={handleNewMealSubmit}>
                <h1 className="headline">Configure your dish</h1>
                <select value={mealType} name="meal type" id="meal-type" onChange={handleMealType}>
                    <option value={""} selected disabled hidden>Choose dish type</option>
                    <option value={"breakfast"}>Breakfast</option>
                    <option value={"lunch"}>Lunch</option>
                    <option value={"dinner"}>Dinner</option>
                    <option value={"snack"}>Snack</option>
                </select>

                <select value={mealTime} name="meal time" id="meal-time" onChange={handleMealTime}>
                    <option value={""} selected disabled hidden>Max preparation time</option>
                    <option value={"5 minutes"}>5 minutes</option>
                    <option value={"10 minutes"}>10 minutes</option>
                    <option value={"15 minutes"}>15 minutes</option>
                    <option value={"20 minutes"}>20 minutes</option>
                    <option value={"30 minutes"}>30 minutes</option>
                    <option value={"40 minutes"}>40 minutes</option>
                    <option value={"50 minutes"}>50 minutes</option>
                </select>

                <input value={mealKcal} type="number" min="1" max="2000" name="meal kcal" placeholder="~ Amount of kcal" onChange={handleMealKcal} />

                <button type="submit">Serve</button>
            </form>
        
            { errorMessage && <p className="error-message">{errorMessage}</p> }

           { loading ? <PacmanLoader
                        className="suggestion-container"
                        color={"#11B44D"}
                        loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> : 
            <div className="suggestion-container" style={{ display: loading ? "none" : "flex" }}>
                { mealImage && splittedInformation && <h2>{splittedInformation[0]}</h2> }
                <div className="meal-spec">
                    { mealImage && splittedInformation && <h3>{splittedInformation[2]}</h3> }
                    { mealImage && splittedInformation && <h3>{splittedInformation[1]}</h3> }
                </div> 
            </div> }
            { mealImage && splittedInformation && <Link to="/meal-details"><img className="serve-img" style={{ display: loading ? "none" : "flex" }} src={mealImage} alt="meal img" width={300} /></Link> }
        </div>
    )
}


export default NewMealPage