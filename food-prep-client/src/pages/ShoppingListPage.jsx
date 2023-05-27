import Navbar from "../components/Navbar";
import { useState, useContext, useEffect } from "react";
import userService from "../services/user.service";
import { AuthContext } from "../context/auth.context";

function ShoppingListPage() {
  const { user } = useContext(AuthContext);

  const [newItem, setNewItem] = useState("");
  const [shoppingList, setShoppingList] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState("");

  const handleCurrentIngredient = (e) => setCurrentIngredient(e.target.value);
  const handleClick = () => handleAddIngredient();
  // Allow add ingredien on enter key press
  const handleKey = (e) => {
    if (e.key === "Enter") handleAddIngredient();
  };

  // Fetch user data on initial page load
  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  function getUserData() {
    userService.fetchUserData().then((response) => {
      setShoppingList(response.data.shoppingList);
    });
  }

  // Add ingredient to shopping list
  function handleAddIngredient() {
    setNewItem(currentIngredient);
    setCurrentIngredient("");
  }

  useEffect(() => {
    if (newItem !== "") {
      handleUpdateShoppingList([newItem]);
    }
  }, [newItem]);

  function handleUpdateShoppingList(newItem) {
    userService
      .updateUserShoppingList(newItem)
      .then(() => {
        userService
          .fetchUserData()
          .then((response) => setShoppingList(response.data.shoppingList))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  // Delete one ingredient by its index from shopping list
  function handleDeleteIngredient(index) {
    userService
      .deleteOneShoppingList(index)
      .then(() => {
        // Update displayed data after delete one
        userService
          .fetchUserData()
          .then((response) => setShoppingList(response.data.shoppingList))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  // Delete all ingredients form shopping list
  function handleDeleteAll() {
    userService
      .deleteAllShoppingList()
      .then(() => {
        // Update displayed data after delete all
        userService
          .fetchUserData()
          .then((response) => setShoppingList(response.data.shoppingList))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Navbar />

      <div className="shopping-list-container">
        <h1 className="shopping-list-headline">
          Add items to your shopping list
        </h1>
        <input
          type="text"
          name="shopping-list"
          value={currentIngredient}
          onChange={handleCurrentIngredient}
          onKeyDown={handleKey}
        />
        {/* Display add ingredient and delete all shopping list buttons */}
        <div className="button-container margin">
          <button
            className="shopping-list-btn"
            type="button"
            onClick={handleClick}
          >
            Add ingredient
          </button>
          <button
            className="shopping-list-btn red"
            type="button"
            onClick={() => handleDeleteAll()}
          >
            Delete all
          </button>
        </div>

        <h2 className="meal-details-text-headline">Shopping list:</h2>
        <ul>
          {/* Display shoppping list */}
          {shoppingList &&
            shoppingList.map((ingredient, index) => (
              <div className="positioning" key={index}>
                <p className="text">- {ingredient}</p>
                <button
                  className="delete-list-btn red"
                  type="button"
                  onClick={() => handleDeleteIngredient(index)}
                >
                  Delete
                </button>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingListPage;
