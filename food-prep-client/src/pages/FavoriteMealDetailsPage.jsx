import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

function FavoriteMealDetailsPage() {
  const { mealId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [mealInformation, setMealInformation] = useState("");
  const [mealIngredients, setMealIngredients] = useState("");
  const [mealInstructions, setMealInstructions] = useState("");
  const [mealShoppingList, setMealShoppingList] = useState("");
  const [mealImage, setMealImage] = useState("");

  const [splittedInformation, setSplittedInformation] = useState([]);
  const [splittedIngredients, setSplittedIngredients] = useState([]);
  const [splittedInstructions, setSplittedInstructions] = useState([]);
  const [splittedShoppingList, setSplittedShoppingList] = useState([]);

  useEffect(() => {
    if (user) {
      getMealData(mealId);
    }
  }, [user]);

  // Fetch specific meal from user favorites
  function getMealData(mealId) {
    userService
      .fetchFavoriteMeal(mealId)
      .then((response) => {
        setMealInformation(response.data.favoriteMeal.mealInformation);
        setMealIngredients(response.data.favoriteMeal.mealIngredients);
        setMealInstructions(response.data.favoriteMeal.mealInstructions);
        setMealShoppingList(response.data.favoriteMeal.mealShoppingList);
        setMealImage(response.data.favoriteMeal.mealImage);
      })
      .catch((err) => console.log(err));
  }

  // Prepare meal data for display
  useEffect(() => {
    const splittedInformation = mealInformation.split("\n").splice(0, 3);
    const splittedIngredients = mealIngredients.split("\n");
    const splittedInstructions = mealInstructions.split("\n");
    const splittedShoppingList = mealShoppingList.split("\n");
    const newSplittedShoppingList = splittedShoppingList
      .map((item) => item.replace(/^- /, ""))
      .splice(1, splittedShoppingList.length);

    setSplittedInformation(splittedInformation);
    setSplittedIngredients(splittedIngredients);
    setSplittedInstructions(splittedInstructions);
    setSplittedShoppingList(newSplittedShoppingList);
  }, [mealInformation, mealIngredients, mealInstructions, mealShoppingList]);

  // Add ingredients to user shoppig list
  function handleAddToShoppingList(shoppingList) {
    userService.updateUserShoppingList(shoppingList);
  }

  // Delete specific favorite meal
  function handleDeleteFavorite(mealId) {
    userService
      .deleteFavoriteMeal(mealId)
      .then(() => navigate("/favorites"))
      .catch((err) => console.log(err));
  }

  // Display loader when data is not loaded
  useEffect(() => {
    if (
      splittedInformation === [] ||
      splittedIngredients === [] ||
      splittedInstructions === [] ||
      mealImage === ""
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    splittedInformation,
    splittedIngredients,
    splittedInstructions,
    mealImage,
  ]);

  return (
    <div>
      <Navbar />

      {loading ? (
        <PacmanLoader
          className="pacman-loader"
          color={"#11B44D"}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="meal-details-desktop">
          <img
            className="meal-details-img"
            src={mealImage}
            alt="meal img"
            width={300}
          />
          {/* Display meal header */}
          <div className="meal-details-container">
            <h2 className="meal-details-headline">{splittedInformation[0]}</h2>
            <div className="meal-details-spec">
              <h3>{splittedInformation[2]}</h3>
              <h3>{splittedInformation[1]}</h3>
            </div>

            {/* Display meal ingredients */}
            <h2 className="meal-details-text-headline">Ingredients:</h2>
            {splittedIngredients.map((ingredient, index) => (
              <p className="text" key={index}>
                {ingredient.replace("Ingredients:", "")}
              </p>
            ))}

            {/* Display meal instructions */}
            <h2 className="meal-details-text-headline">Instructions:</h2>
            {splittedInstructions.map((instruction, index) => (
              <p className="text" key={index}>
                {instruction.replace("Instructions:", "")}
              </p>
            ))}

            {/* Display delete and add to shopping list buttons */}
            <div className="button-container">
              <button
                className="red"
                type="submit"
                onClick={() => handleDeleteFavorite(mealId)}
              >
                Delete favorite
              </button>
              <button
                type="submit"
                onClick={() => handleAddToShoppingList(splittedShoppingList)}
              >
                To shopping list
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FavoriteMealDetailsPage;
