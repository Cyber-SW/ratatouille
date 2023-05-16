import Navbar from "../components/Navbar"
import { useState, useContext, useEffect } from "react"
import userService from "../services/user.service"
import { AuthContext } from "../context/auth.context"



function ShoppingListPage() {
    const { user } = useContext(AuthContext)

    const [newItem, setNewItem] = useState("")
    const [shoppingList, setShoppingList] = useState("")
    const [currentIngredient, setCurrentIngredient] = useState("")

    const handleCurrentIngredient = (e) => setCurrentIngredient(e.target.value)
    const handleClick = () => handleAddIngredient()
    const handleKey = (e) => { if (e.key === "Enter") handleAddIngredient() }   
    

    useEffect(() => {
        if (user) {
            getUserData()
        }  
    }, [user])


    function getUserData() {
        userService.fetchUserData()
            .then((response) => {
                setShoppingList(response.data.shoppingList)
            })
    }


    function handleAddIngredient() {
        setNewItem(currentIngredient)
        setCurrentIngredient("")
    }


    useEffect(() => {
        if (newItem !== "") {
            handleUpdateShoppingList([newItem])
        } 
    }, [newItem])


    function handleUpdateShoppingList(newItem) {
        userService.updateUserShoppingList(newItem)
            .then(() => {
                userService.fetchUserData()
                    .then((response) => setShoppingList(response.data.shoppingList))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    } 


    function handleDeleteIngredient(index) {
        userService.deleteOneShoppingList(index)
            .then(() => {
                userService.fetchUserData()
                    .then((response) => setShoppingList(response.data.shoppingList))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }


    function handleDeleteAll() {
        userService.deleteAllShoppingList()
            .then(() => {
                userService.fetchUserData()
                    .then((response) => setShoppingList(response.data.shoppingList))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    

    return (
        <div>
            <Navbar />

            <h1>Shopping list</h1>

            <h2>Add items to your shopping list</h2>
                <input type="text" name="shopping-list" value={currentIngredient} onChange={handleCurrentIngredient} onKeyDown={handleKey} />
                <button type="button" onClick={handleClick}>Add ingredient</button>
                <button type="button" onClick={() => handleDeleteAll()}>Delete all</button>

            <ul>
                { shoppingList && shoppingList.map((ingredient, index) => (
                    <li key={index}>- {ingredient} <button type="button" onClick={() => handleDeleteIngredient(index)}>Delete</button></li>
                ))}
            </ul>
        </div>
    )
}

export default ShoppingListPage
