import React, { useState, useEffect, useContext } from "react"
import PropTypes from "prop-types";
import userService from "../services/user.service"
import { AuthContext } from "../context/auth.context"


const DataStorageContext = React.createContext()

function DataStorageProviderWrapper(props) {
    const [storedMealInformation, setStoredMealInformation] = useState("")
    const [storedMealIngredients, setStoredMealIngredients] = useState("")
    const [storedMealInstructions, setStoredMealInstructions] = useState("")
    const [storedMealShoppingList, setStoredMealShoppingList] = useState("")
    const [storedMealImage, setStoredMealImage] = useState("")
    const [userData, setUserData] = useState({})
    const [appState, setAppState] = useState({})

    const { user } = useContext(AuthContext)

    const handleDataStorage = (newMealData) => {
        const appState = {
            mealInformation: newMealData.mealInformation,
            mealIngredients: newMealData.mealIngredients,
            mealInstructions: newMealData.mealInstructions,
            mealShoppingList: newMealData.mealShoppingList,
            mealImage: newMealData.mealImage
        }
        console.log("USER ID", user._id)
        console.log("APP STATE", newMealData)
        userService.storeUserAppState(user._id, appState)
        setAppState(appState)
    }


    console.log("INFORMATION", storedMealInformation)
    console.log("INGREDIENTS", storedMealIngredients)
    console.log("INSTRUCTIONS", storedMealInstructions)
    console.log("SHOPPING LIST", storedMealShoppingList)
    console.log("IMAGE", storedMealImage)
    

    useEffect(() => {
        if (user) {
            userService.fetchUserData(user._id)
                .then(response => {
                    console.log("USER DATA", response.data)
                    setUserData(response.data)
                    setStoredMealInformation(response.data.appState.mealInformation)
                    setStoredMealIngredients(response.data.appState.mealIngredients)
                    setStoredMealInstructions(response.data.appState.mealInstructions)
                    setStoredMealShoppingList(response.data.appState.mealShoppingList)
                    setStoredMealImage(response.data.appState.mealImage)
            })
        }
    }, [user, appState])


    return (
        <DataStorageContext.Provider 
            value={{ storedMealInformation, storedMealIngredients, storedMealInstructions, storedMealShoppingList, storedMealImage, handleDataStorage }}
        >
            {props.children}
        </DataStorageContext.Provider>
    )
}

DataStorageProviderWrapper.propTypes = {
    children: PropTypes.node.isRequired,
  }

export { DataStorageProviderWrapper, DataStorageContext }