const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");


// Middleware configuration
module.exports = (app) => {
  app.set("trust proxy", 1);

  console.log(process.env.ORIGIN)

  app.use(
    cors({
      origin: process.env.ORIGIN,
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
