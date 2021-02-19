const express = require("express");

const routes = express.Router();

const RecipeController = require("../app/controllers/RecipeController");
const SearchController = require("../app/controllers/SearchController");

routes.get("/search", SearchController.index);

routes.get("/", RecipeController.index);
routes.get("/:id", RecipeController.show);

module.exports = routes;