const express = require("express");

const routes = express.Router();

const SessionController = require("../app/controllers/SessionController");

// Auth routes

routes.get("/login", SessionController.loginForm);
routes.post("/login", SessionController.login);
routes.post("/logout", SessionController.logout);

// Reset Password

routes.get("/forgot-password", SessionController.forgotForm);
routes.get("/password-reset", SessionController.resetForm);
routes.post("/forgot-password", SessionController.forgot);
routes.post("/password-reset", SessionController.reset);

module.exports = routes;