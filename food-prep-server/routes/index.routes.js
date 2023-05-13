const router = require("express").Router();
const { google } = require("googleapis")
const User = require("../models/User.model");
const { Configuration, OpenAIApi } = require("openai")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//user data routes
router.get("/user/:userId", (req, res, next) => {
  const userId = req.params.userId

  User.findById(userId)
    .then(user => {
      res.json(user)
    })
})

module.exports = router;


//external api route: openai API
router.post("/user/new-meal/:userId", (req, res, next) => {
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
router.get("/user/new-meal/:newMealName", async (req, res, next) => {
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
