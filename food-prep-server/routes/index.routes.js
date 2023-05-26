const router = require("express").Router();
const mongoose = require("mongoose");
const { google } = require("googleapis");
const User = require("../models/User.model");
const { Configuration, OpenAIApi } = require("openai");

//user data routes
router.get("/user", (req, res) => {
  const userId = req.payload._id;

  User.findById(userId)
    .then((receivedUser) => {
      const {
        username,
        _id,
        gender,
        size,
        weight,
        bmi,
        goal,
        activityLevel,
        calorieDemand,
        diet,
        excludedIngredients,
        appState,
        shoppingList,
        favorites,
      } = receivedUser;
      //omit email and password
      const user = {
        username,
        _id,
        gender,
        size,
        weight,
        bmi,
        goal,
        activityLevel,
        calorieDemand,
        diet,
        excludedIngredients,
        appState,
        shoppingList,
        favorites,
      };
      res.json(user).status(200);
    })
    .catch((err) => console.log(err));
});

//store user app state
router.post("/user/update-state", (req, res) => {
  const userId = req.payload._id;
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const { appState } = req.body;

  User.findByIdAndUpdate(userObjectId, { appState }, { new: true })
    .then(() => res.status(200).json())
    .catch((err) => console.log(err));
});

//update user profile
router.post("/user/profile/edit", (req, res) => {
  const userId = req.payload._id;
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const { updatedInfo } = req.body;

  User.findByIdAndUpdate(
    userObjectId,
    {
      username: updatedInfo.username,
      size: updatedInfo.size,
      weight: updatedInfo.weight,
      bmi: updatedInfo.bmi,
      goal: updatedInfo.goal,
      activityLevel: updatedInfo.activityLevel,
      calorieDemand: updatedInfo.calorieDemand,
      diet: updatedInfo.diet,
      excludedIngredients: updatedInfo.excludedIngredients,
    },
    { new: true }
  )
    .then(() => res.status(200).json())
    .catch((err) => console.log(err));
});

//update user shopping list
router.post("/user/shopping-list/update", (req, res) => {
  const userId = req.payload._id;
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const { newItem } = req.body;

  User.findByIdAndUpdate(
    userObjectId,
    { $push: { shoppingList: { $each: newItem } } },
    { new: true }
  )
    .then(() => res.status(200).json())
    .catch((err) => console.log(err));
});

//delete one shopping list
router.post("/user/shopping-list/delete-one", async (req, res) => {
  const userId = req.payload._id;
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const { index } = req.body;

  try {
    const response = await User.updateOne(
      { _id: userObjectId },
      { $unset: { [`shoppingList.${index}`]: 1 } }
    );
    await User.updateOne(
      { _id: userObjectId },
      { $pull: { shoppingList: null } }
    );
    res.json(response.data).status(200);
  } catch (err) {
    console.log(err);
  }
});

//delete all shopping list
router.post("/user/shopping-list/delete-all", (req, res) => {
  const userId = req.payload._id;
  const userObjectId = new mongoose.Types.ObjectId(userId);

  User.findByIdAndUpdate(userObjectId, { $set: { shoppingList: [] } })
    .then(() => res.status(200).json())
    .catch((err) => console.log(err));
});

//add meal to favorites
router.post("/user/favorites/add", (req, res) => {
  const userId = req.payload._id;
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const { meal } = req.body;

  User.findByIdAndUpdate(
    userObjectId,
    {
      $push: {
        favorites: {
          mealInformation: meal.mealInformation,
          mealIngredients: meal.mealIngredients,
          mealInstructions: meal.mealInstructions,
          mealShoppingList: meal.mealShoppingList,
          mealImage: meal.mealImage,
        },
      },
    },
    { new: true }
  )
    .then(() => res.status(200).json())
    .catch((err) => console.log(err));
});

// fetch favorite meal
router.get("/user/favorite/meal-details/:mealId", (req, res) => {
  const userId = req.payload._id;
  const mealId = req.params.mealId;
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const mealObjectId = new mongoose.Types.ObjectId(mealId);

  User.findById(userObjectId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const favoriteMeal = user.favorites.find((favorite) =>
        favorite._id.equals(mealObjectId)
      );

      if (!favoriteMeal) {
        return res.status(404).json({ message: "Favorite meal not found" });
      }

      res.status(200).json({ favoriteMeal });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});

//delete favorite meal
router.post("/user/favorite/meal-details/:mealId/delete", (req, res) => {
  const userId = req.payload._id;
  const mealId = req.params.mealId;
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const mealObjectId = new mongoose.Types.ObjectId(mealId);

  User.findByIdAndUpdate(
    userObjectId,
    { $pull: { favorites: { _id: mealObjectId } } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove null values from favorites array
      user.favorites = user.favorites.filter((favorite) => favorite !== null);
      user.save();

      res.status(200).json({ message: "Meal removed from favorites" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});

//external api route: openai API
router.post("/user/new-meal", (req, res) => {
  const { newMeal } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  async function generateMeals() {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: newMeal }],
        max_tokens: 900,
        temperature: 1,
      });
      console.log(response.data.choices[0].message.content)
      res.json(response.data.choices[0].message.content).status(200);
    } catch (err) {
      console.log(err);
    }
  }
  generateMeals();
});

//external api route: Custom Search JSON API
router.get("/user/new-meal/:newMealName", async (req, res) => {
  const newMealImage = req.params.newMealName;

  const customsearch = google.customsearch("v1");

  try {
    const imageUrl = await searchForImage(newMealImage);
    res.json(imageUrl).status(200);
  } catch (err) {
    console.error(err);
  }

  async function searchForImage(newMealImage) {
    const response = await customsearch.cse.list({
      cx: process.env.GAPI_CSE_ID,
      q: newMealImage,
      filter: "1",
      imgColorType: "color",
      imgSize: "huge",
      imgType: "photo",
      num: 1,
      searchType: "image",
      alt: "json",
      auth: process.env.GAPI_CSE_API_KEY,
    });

    if (
      response &&
      response.data &&
      response.data.items &&
      response.data.items.length > 0
    ) {
      return response.data.items[0].link;
    } else {
      throw new Error("No images found for query: " + newMealImage);
    }
  }
});

module.exports = router;
