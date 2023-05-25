require("dotenv").config();
require("./db");
const express = require("express");

const app = express();
const { isAuthenticated } = require("./middleware/jwt.middleware");

require("./config")(app);

//api routes
const indexRoutes = require("./routes/index.routes");
app.use("/api", isAuthenticated, indexRoutes);

//auth routes
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;

//handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
