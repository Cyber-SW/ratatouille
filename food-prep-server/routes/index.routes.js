const router = require("express").Router();
// const { response } = require("express");
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


//external api route: openai
router.post("/user/new-meal/:userId", (req, res, next) => {
  const { newMeal } = req.body
  console.log("meal instructions", req.body)

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  
  async function generateMeals() {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: newMeal,
        max_tokens: 900,
        temperature: 0.2,
      });
      console.log("OPENAI API RESPONSE: ", response.data)
      res.json(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  generateMeals();
})


//external api route: SerpApi
