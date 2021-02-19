const express = require("express");

const HomeController = require("./app/controllers/HomeController");
const InstitutionalController = require("./app/controllers/InstitutionalController");
const RecipeController = require("./app/controllers/RecipeController");
const SearchController = require("./app/controllers/SearchController");
const ChefController = require("./app/controllers/ChefController");
const RecipeAdminController = require("./app/controllers/RecipeAdminController");
const ChefAdminController = require("./app/controllers/ChefAdminController");

const multer = require("./app/middlewares/multer");

const routes = express.Router();

routes.get("/", HomeController.index);

routes.get("/about", InstitutionalController.about);

routes.get("/results", SearchController.index);

routes.get("/recipes", RecipeController.index);
routes.get("/recipes/:id", RecipeController.show);

routes.get("/chefs", ChefController.index);
routes.get("/chefs/:id", ChefController.show);

routes.get("/admin/recipes", RecipeAdminController.index);
routes.get("/admin/recipes/create", RecipeAdminController.create);
routes.get("/admin/recipes/:id", RecipeAdminController.show);
routes.get("/admin/recipes/:id/edit", RecipeAdminController.edit);

routes.post("/admin/recipes", multer.array("photos", 5), RecipeAdminController.post);
routes.put("/admin/recipes", multer.array("photos", 5), RecipeAdminController.put);
routes.delete("/admin/recipes", RecipeAdminController.delete);

routes.get("/admin/chefs", ChefAdminController.index);
routes.get("/admin/chefs/create", ChefAdminController.create);
routes.get("/admin/chefs/:id", ChefAdminController.show);
routes.get("/admin/chefs/:id/edit", ChefAdminController.edit);

routes.post("/admin/chefs", multer.array("photos", 1), ChefAdminController.post);
routes.put("/admin/chefs", multer.array("photos", 1), ChefAdminController.put);
routes.delete("/admin/chefs", ChefAdminController.delete);

module.exports = routes;