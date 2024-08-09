const express = require("express");
const usersController = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const userRouter = express.Router();

// Register
userRouter.post("/register", usersController.register);

// Login
userRouter.post("/login", usersController.login);

// Profile
userRouter.get("/profile", isAuthenticated, usersController.profile);

// Change password
userRouter.put(
  "/change-password",
  isAuthenticated,
  usersController.changePassword
);

// Update profile
userRouter.put(
  "/update-profile",
  isAuthenticated,
  usersController.updateProfile
);

module.exports = userRouter;
