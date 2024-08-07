const express = require("express");
const usersController = require("../controllers/usersCtrl");

const userRouter = express.Router();

userRouter.post("/api/v1/users/register", usersController.register);
// Uncomment the following line when the login handler is added to usersController
// userRouter.post("/api/v1/users/login", usersController.login);

module.exports = userRouter;
