import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";
import { Link } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

function NewMealPage() {
  const { user } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [mealType, setMealType] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [mealKcal, setMealKcal] = useState("");
  const [newMeal, setNewMeal] = useState("");
  const [mealInformation, setMealInformation] = useState("");
  const [mealImage, setMealImage] = useState("");
  const [diet, setDiet] = useState("");
  const [excludedIngredients, setExcludedIngredients] = useState("");
  const [splittedInformation, setSplittedInformation] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleMealType = (e) => setMealType(e.target.value);
  const handleMealTime = (e) => setMealTime(e.target.value);
  const handleMealKcal = (e) => {
    setMealKcal(e.target.value);
    // Set error message back to undefined on new user input
    setErrorMessage(undefined);
  };

  // Turn generate meal loading animation off when error message appears
  useEffect(() => {
    setLoading(false);
    setMealTime("");
    setMealType("");
    setMealKcal("");
    setNewMeal("");
  }, [errorMessage]);

  // Create promt from user profile data and user input data
  function handleNewMealSubmit(e) {
    e.preventDefault();

    const mealConfiguration = `You are a master chef working for years in different restaurants knowing thousands of meals and everything about preparing them.
        
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
        
        `;

    setNewMeal(mealConfiguration);
    setLoading(true);
  }

  // Fetch user data on initial page load
  useEffect(() => {
    getUserData();
  }, []);

  function getUserData() {
    userService
      .fetchUserData()
      .then((response) => {
        setUsername(response.data.username);
        setMealInformation(response.data.appState.mealInformation);
        setMealImage(response.data.appState.mealImage);
        setExcludedIngredients(response.data.excludedIngredients);
        setDiet(response.data.diet);
      })
      .catch((err) => console.log(err));
  }

  // Call APIs if new meal state is not empty string anymore
  useEffect(() => {
    if (newMeal !== "") {
      apiCall();
    }
  }, [newMeal]);

  // Call openaiAPI and Google custom search API
  async function apiCall() {
    try {
      const receivedMeal = await userService.fetchUserMeal(newMeal);
      const mealSubstrings = receivedMeal.data.split("\n\n");
      const mealName = mealSubstrings[0].match(/Meal name:\s*(.*)\n/)[1];
      const mealImage = await userService.fetchMealImage(mealName);
      // Pass received data to data storage function
      handleDataStorage({
        mealInformation: mealSubstrings[0],
        mealIngredients: mealSubstrings[1],
        mealInstructions: mealSubstrings[2],
        mealShoppingList: mealSubstrings[3],
        mealImage: mealImage.data,
      });
    } catch (err) {
      setErrorMessage(
        "Oops, your food got burnt, unfortunately. Please try again. In case the generation process takes longer than 30 seconds please refresh the page!"
      );
      console.log(err);
    }
  }

  const handleDataStorage = (newMealData) => {
    const appState = {
      mealInformation: newMealData.mealInformation,
      mealIngredients: newMealData.mealIngredients,
      mealInstructions: newMealData.mealInstructions,
      mealShoppingList: newMealData.mealShoppingList,
      mealImage: newMealData.mealImage,
    };
    userService
      // Store received data in app state
      .storeUserAppState(appState)
      // Fetch user data again to update user display
      .then(() => {
        userService
          .fetchUserData()
          .then((response) => {
            setMealInformation(response.data.appState.mealInformation);
            setMealImage(response.data.appState.mealImage);
            setLoading(false);
            setMealTime("");
            setMealType("");
            setMealKcal("");
            setNewMeal("");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  // Prepare data for display
  useEffect(() => {
    if (user && mealInformation) {
      const splittedInformation = mealInformation.split("\n").splice(0, 3);
      const newSplittedInfromation = splittedInformation.map((item) =>
        item
          .replace("Meal name: ", "")
          .replace(/(Time:\s*.+).*/, "$1")
          .replace(/(Kcal:\s*\d+).*/, "$1")
      );

      setSplittedInformation(newSplittedInfromation);
    }
  }, [user, mealInformation]);

  return (
    <div>
      <Navbar />

      <div className="username">Hello {user && username} nice to see you💚</div>

      <div className="desktop-container">
        {/* Display configure meal input fields */}
        <form className="form-container" onSubmit={handleNewMealSubmit}>
          <h1 className="headline">Configure your dish</h1>
          <select
            value={mealType}
            name="meal type"
            id="meal-type"
            onChange={handleMealType}
          >
            <option value={""} selected disabled hidden>
              Choose dish type
            </option>
            <option value={"breakfast"}>Breakfast</option>
            <option value={"lunch"}>Lunch</option>
            <option value={"dinner"}>Dinner</option>
            <option value={"snack"}>Snack</option>
          </select>

          <select
            value={mealTime}
            name="meal time"
            id="meal-time"
            onChange={handleMealTime}
          >
            <option value={""} selected disabled hidden>
              Max. preparation time
            </option>
            <option value={"5 minutes"}>5 minutes</option>
            <option value={"10 minutes"}>10 minutes</option>
            <option value={"15 minutes"}>15 minutes</option>
            <option value={"20 minutes"}>20 minutes</option>
            <option value={"30 minutes"}>30 minutes</option>
            <option value={"40 minutes"}>40 minutes</option>
            <option value={"50 minutes"}>50 minutes</option>
          </select>

          <input
            value={mealKcal}
            type="number"
            min="1"
            max="2000"
            name="meal kcal"
            placeholder="~ Amount of kcal"
            onChange={handleMealKcal}
          />

          <button type="submit">Serve</button>
          {errorMessage && (
            <p
              className="error-message"
              style={{ display: loading ? "none" : "flex" }}
            >
              {errorMessage}
            </p>
          )}
        </form>

        {/* Display loader until data is there */}
        {loading ? (
          <PacmanLoader
            className="pacman-loader-meal-generation"
            color={"#11B44D"}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div
            // Display generated meal
            className="suggestion-container"
            style={{ display: loading || mealImage === "" ? "none" : "flex" }}
          >
            {mealImage && splittedInformation && (
              <h2 className="white-desktop">{splittedInformation[0]}</h2>
            )}
            <div className="meal-spec">
              {mealImage && splittedInformation && (
                <h3 className="white-desktop">{splittedInformation[2]}</h3>
              )}
              {mealImage && splittedInformation && (
                <h3 className="white-desktop">{splittedInformation[1]}</h3>
              )}
            </div>
          </div>
        )}
        {mealImage && splittedInformation && (
          <Link to="/new-meal/meal-details">
            <img
              className="serve-img"
              style={{ display: loading ? "none" : "flex" }}
              src={mealImage}
              alt="meal img"
              width={300}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default NewMealPage;
