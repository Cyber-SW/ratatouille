import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"


function MealDetailsPage() {
    const [mealInformation] = useState(JSON.parse(localStorage.getItem('mealInformation')))
    const [mealIngredients] = useState(JSON.parse(localStorage.getItem('mealIngredients')))
    const [mealInstructions] = useState(JSON.parse(localStorage.getItem('mealInstructions')))
    const [mealImage] = useState(JSON.parse(localStorage.getItem('mealImage')))

    const [splittedInformation, setSplittedInformation] = useState([])
    const [splittedIngredients, setSplittedIngredients] = useState([])
    const [splittedInstructions, setSplittedInstructions] = useState([])

    useEffect(() => {
        const splittedInformation = mealInformation.split("\n").splice(0, 3)
        const splittedIngredients = mealIngredients.split("\n")
        const splittedInstructions = mealInstructions.split("\n")
        
        setSplittedInformation(splittedInformation)
        setSplittedIngredients(splittedIngredients)
        setSplittedInstructions(splittedInstructions)
    }, [])


    console.log(splittedInformation)
    return (
        <div>
            <Navbar />

            <h1>Meal details</h1>
            <img src={mealImage} alt="meal img" width={300} />

            {splittedInformation.map((info, index) => (
                <h2 key={index}>{info}</h2>
            ))}

            {splittedIngredients.map((ingredient, index) => (
                <p key={index}>{ingredient}</p>
            ))}

            {splittedInstructions.map((instruction, index) => (
                <p key={index}>{instruction}</p>
            ))}
        </div>
    )
}

export default MealDetailsPage