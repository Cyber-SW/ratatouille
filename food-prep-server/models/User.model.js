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
      type: Number,
      required: [true, "Age is required."]
    },
    size: {
      type: Number,
      required: [true, "Size is required."]
    },
    weight: {
      type: Number,
      required: [true, "Weight is required."]
    },
    goal: {
      type: String,
      required: [true, "Goal is required."],
      enum: ["Lose Weight", "Gain Weight", "Keep Weight"]
    },
    bmi: {
      type: Number
    },
    calorieDemand: {
      type: Number
    },
    preferences: {
      type: String,
      required: [true, "Preferences are required."],
      enum: ["No Preference", "Vegetarian", "Vegan", "Low Carb"]
    },
    time: {
      type: String,
      required: [true, "Time is required."],
      enum: ["15 min", "30 min", "60 min"]
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
