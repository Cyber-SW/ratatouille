const router = require("express").Router();
const mongoose = require("mongoose")
const { google } = require("googleapis")
const User = require("../models/User.model");
const { Configuration, OpenAIApi } = require("openai")


router.get("/", (req, res, next) => {
  res.json("All good in here");
});


//user data routes
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId

  User.findById(userId)
    .then(receivedUser => {
      const {
        username,
        _id,
        gender,
        age,
        size,
        weight,
        bmi,
        goal,
        activityLevel,
        calorieDemand,
        diet,
        excludedIngredients,
        appState
      } = receivedUser;
      //omit email and password
      const user = {
        username,
        _id,
        gender,
        age,
        size,
        weight,
        bmi,
        goal,
        activityLevel,
        calorieDemand,
        diet,
        excludedIngredients,
        appState
      };
      res.json(user)
    })
})


//store user app state
router.post("/user/:userId/update-state", (req, res) => {
  const userId = req.params.userId
  const userObjectId = new mongoose.Types.ObjectId(userId)
  const { appState } = req.body

  User.findByIdAndUpdate(userObjectId, { appState }, { new: true })
    .then(() => res.status(200))
    .catch(err => console.log(err))
})

//update user profile
router.post("/user/:userId/profile/edit", (req, res) => {
  const userId = req.params.userId
  const userObjectId = new mongoose.Types.ObjectId(userId)
  const { updatedInfo } = req.body
  console.log({updatedInfo})

  User.findByIdAndUpdate(userObjectId, { size: updatedInfo.size, weight: updatedInfo.weight, bmi: updatedInfo.bmi, goal: updatedInfo.goal, activityLevel: updatedInfo.activityLevel, calorieDemand: updatedInfo.calorieDemand, diet: updatedInfo.diet, excludedIngredients: updatedInfo.excludedIngredients }, { new: true })
    .then(() => res.status(200).send({ message: "Profile successfully updated!" }))
    .catch(err => console.log(err))
})


//external api route: openai API
router.post("/user/:userId/new-meal", (req, res) => {
  const { newMeal } = req.body
  console.log("meal instructions", req.body)

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  
  async function generateMeals() {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: newMeal}],
        max_tokens: 900,
        temperature: 1,
      });
      console.log("OPENAI API RESPONSE: ", response.data.choices[0].message)
      res.json(response.data.choices[0].message.content)
    }
    catch (err) {
      console.log(err)
    }
  }
  generateMeals();
})


//external api route: Custom Search JSON API
router.get("/user/new-meal/:newMealName", async (req, res) => {
  const newMealImage = req.params.newMealName
  console.log("NEW MEAL NAME", newMealImage)

  const customsearch = google.customsearch("v1")

  try {
    const imageUrl = await searchForImage(newMealImage);
    res.json(imageUrl)
  } catch (err) {
    console.error(err)
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

    if (response && response.data && response.data.items && response.data.items.length > 0) {
      return response.data.items[0].link
    } else {
      throw new Error("No images found for query: " + newMealImage)
    }
  }
});


module.exports = router;