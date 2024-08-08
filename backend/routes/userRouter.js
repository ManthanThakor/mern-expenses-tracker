const express = require("express");
const usersController = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const userRouter = express.Router();

//! Register
userRouter.post("/api/v1/users/register", usersController.register);

//! Login
userRouter.post("/api/v1/users/login", usersController.login);

//! Profile
userRouter.get(
  "/api/v1/users/profile",
  isAuthenticated,
  usersController.profile
);

module.exports = userRouter;
