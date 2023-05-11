const router = require("express").Router();
const { response } = require("express");
const User = require("../models/User.model");
const mongoose = require("mongoose")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/user/:userId", (req, res, next) => {
  const userId = req.params.userId

  User.findById(userId)
    .then(user => {
      res.json(user)
    })
})

module.exports = router;
