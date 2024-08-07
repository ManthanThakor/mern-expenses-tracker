const express = require("express");
const usersController = require("../controllers/usersCtrl");

const userRouter = express.Router();

//! register

userRouter.post("/api/v1/users/register", usersController.register);

//! login

userRouter.post("/api/v1/users/login", usersController.login);

//! profile

userRouter.get("/api/v1/users/profile", usersController.profile);

module.exports = userRouter;
