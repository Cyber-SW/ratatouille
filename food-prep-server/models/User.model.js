const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true
    },
    gender: {
      type: String,
      required: [true, "Gender is required."],
      enum: ["Male", "Female"]
    },
    size: {
      type: String,
      required: [true, "Size is required."]
    },
    weight: {
      type: String,
      required: [true, "Weight is required."]
    },
    bmi: {
      type: String
    },
    goal: {
      type: String,
      required: [true, "Goal is required."]
    },
    activityLevel: {
      type: String,
      required: [true, "Activity level is required."],
      enum: ["Only sitting or lying / Frail people", "Sedentary, hardly any physical activity / Office work at the desk", "Predominantly sitting, walking and standing / Students, pupils, cab drivers", "Mainly standing and walking / Salesman, waiter, craftsman", "Physically demanding work / Farmers, high performance athletes"]
    },
    calorieDemand: {
      type: String
    },
    diet: {
      type: String,
      required: [true, "Preferences are required."],
      enum: ["any delicious", "vegetarian", "vegan", "low Carb"]
    },
    excludedIngredients: {
      type: Array
    },
    appState: {
      type: Object,
      default: {
        mealInformation: "",
        mealIngredients: "",
        mealInstructions: "",
        mealShoppingList: "",
        mealImage: ""
      }
    },
    shoppingList: [{
      type: String
    }],
    favorites: [{
      _id: {
        type: mongoose.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
      },
      mealInformation: String,
      mealIngredients: String,
      mealInstructions: String,
      mealShoppingList: String,
      mealImage: String
    }]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
