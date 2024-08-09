const express = require("express");
const transactionController = require("../controllers/transactionCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const transactionRouter = express.Router();

// Add transaction
transactionRouter.post(
  "/create",
  isAuthenticated,
  transactionController.create
);

// List transactions
transactionRouter.get(
  "/lists",
  isAuthenticated,
  transactionController.getFilteredTransactions
);

// Update transaction
transactionRouter.put(
  "/update/:id",
  isAuthenticated,
  transactionController.update
);

// Delete transaction
transactionRouter.delete(
  "/delete/:id",
  isAuthenticated,
  transactionController.delete
);

module.exports = transactionRouter;
