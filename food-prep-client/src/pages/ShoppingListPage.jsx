import Navbar from "../components/Navbar"
import { useState, useContext, useEffect } from "react"
import userService from "../services/user.service"
import { AuthContext } from "../context/auth.context"
import { DataStorageContext } from "../context/dataStorage.context"

function ShoppingListPage() {
    const { user } = useContext(AuthContext)
    const { userData } = useContext(DataStorageContext)

    const [newItem, setNewItem] = useState("")
    const [shoppingListDb, setShoppingListDb] = useState("")
    const [currentIngredient, setCurrentIngredient] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleCurrentIngredient = (e) => setCurrentIngredient(e.target.value)
    const handleClick = () => handleAddIngredient()
    const handleKey = (e) => { if (e.key === "Enter") handleAddIngredient() }   
    

    function handleAddIngredient() {
        setNewItem(currentIngredient)
        setCurrentIngredient("")
    }


    useEffect(() => {
        if (newItem !== "") {
            handleUpdateShoppingList(user._id, newItem)
        } 
    }, [newItem])


    function handleUpdateShoppingList(userId, newItem) {
        userService.updateUserShoppingList(userId, newItem)
            .then(() => {
                userService.fetchUserData(userId)
                    .then((response) => setShoppingListDb(response.data.shoppingList))
            })
    }


    useEffect(() => {
        if (userData && userData.shoppingList) {
            setShoppingListDb(userData.shoppingList)
        }
    }, [userData])


    function handleDeleteIngredient(userId, index) {
        userService.deleteOneShoppingList(userId, index)
            .then(() => {
                userService.fetchUserData(userId)
                    .then((response) => setShoppingListDb(response.data.shoppingList))
            })
    }

    function handleDeleteAll(userId) {
        userService.deleteAllShoppingList(userId)
            .then(() => {
                userService.fetchUserData(userId)
                    .then((response) => setShoppingListDb(response.data.shoppingList))
            })
    }
    

    

    console.log("USER DA", userData)
    console.log("user data shopping list", userData.shoppingList)
    console.log("shopping DB", shoppingListDb)

    return (
        <div>
            <Navbar />

            <h1>Shopping list</h1>

            <h2>Add items to your shopping list</h2>
                <input type="text" name="shopping-list" value={currentIngredient} onChange={handleCurrentIngredient} onKeyDown={handleKey} />
                <button type="button" onClick={handleClick}>Add ingredient</button>
                <button type="button" onClick={() => handleDeleteAll(user._id)}>Delete all</button>

            <ul>
                    { shoppingListDb && shoppingListDb.map((ingredient, index) => (
                        <li key={index}>{ingredient} <button type="button" onClick={() => handleDeleteIngredient(user._id, index)}>Delete</button></li>
                    ))}
                </ul>
                { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>
    )
}

export default ShoppingListPage
