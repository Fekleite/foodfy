const express = require("express");

const routes = express.Router();

const ChefController = require("../app/controllers/ChefController");

routes.get("/", ChefController.index);
routes.get("/:id", ChefController.show);

module.exports = routes;