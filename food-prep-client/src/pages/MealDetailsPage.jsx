import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";
import PacmanLoader from "react-spinners/PacmanLoader";

function MealDetailsPage() {
  const { user } = useContext(AuthContext);

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
      getUserData();
    }
  }, [user]);

  function getUserData() {
    userService
      .fetchUserData()
      .then((response) => {
        setMealInformation(response.data.appState.mealInformation);
        setMealIngredients(response.data.appState.mealIngredients);
        setMealInstructions(response.data.appState.mealInstructions);
        setMealShoppingList(response.data.appState.mealShoppingList);
        setMealImage(response.data.appState.mealImage);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const splittedInformation = mealInformation.replace("Meal name: ", "");
    const newSplittedInfromation = splittedInformation.split("\n");
    const splittedIngredients = mealIngredients.split("\n");
    const splittedInstructions = mealInstructions.split("\n");
    const splittedShoppingList = mealShoppingList.split("\n");
    const newSplittedShoppingList = splittedShoppingList
      .map((item) => item.replace(/^- /, ""))
      .splice(1, splittedShoppingList.length);

    setSplittedInformation(newSplittedInfromation);
    setSplittedIngredients(splittedIngredients);
    setSplittedInstructions(splittedInstructions);
    setSplittedShoppingList(newSplittedShoppingList);
  }, [mealInformation, mealIngredients, mealInstructions, mealShoppingList]);

  function handleAddToFavorites(
    mealInformation,
    mealIngredients,
    mealInstructions,
    mealShoppingList,
    mealImage
  ) {
    const meal = {
      mealInformation: mealInformation,
      mealIngredients: mealIngredients,
      mealInstructions: mealInstructions,
      mealShoppingList: mealShoppingList,
      mealImage: mealImage,
    };
    userService.addMealToFavorites(meal);
  }

  function handleAddToShoppingList(shoppingList) {
    userService.updateUserShoppingList(shoppingList);
  }

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
          className="pacman-loader-details"
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
          <div className="meal-details-container">
            <h2 className="meal-details-headline">{splittedInformation[0]}</h2>
            <div className="meal-details-spec">
              <h3>{splittedInformation[2]}</h3>
              <h3>{splittedInformation[1]}</h3>
            </div>

            <h2 className="meal-details-text-headline">Ingredients:</h2>
            {splittedIngredients.map((ingredient, index) => (
              <p className="meal-details text" key={index}>
                {ingredient.replace("Ingredients:", "")}
              </p>
            ))}

            <h2 className="meal-details-text-headline">Instructions:</h2>
            {splittedInstructions.map((instruction, index) => (
              <p className="meal-details text" key={index}>
                {instruction.replace("Instructions:", "")}
              </p>
            ))}

            <div className="button-container">
              <button
                type="submit"
                onClick={() =>
                  handleAddToFavorites(
                    mealInformation,
                    mealIngredients,
                    mealInstructions,
                    mealShoppingList,
                    mealImage
                  )
                }
              >
                To favorites
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

export default MealDetailsPage;
