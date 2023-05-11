const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
    age: {
      type: String,
      required: [true, "Age is required."]
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
      enum: ["No Preference", "Vegetarian", "Vegan", "Low Carb"]
    },
    breakfastTime: {
      type: String,
      required: [true, "breakfastTime is required."],
      enum: ["10 minutes", "20 minutes", "30 minutes"]
    },
    lunchTime: {
      type: String,
      required: [true, "lunchTime is required."],
      enum: ["15 minutes", "30 minutes", "60 minutes"]
    },
    dinnerTime: {
      type: String,
      required: [true, "dinnerTime is required."],
      enum: ["10 minutes", "20 minutes", "30 minutes"]
    },
    excludedIngredients: {
      type: Array
    },
    fridge: {
      type: Array
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
