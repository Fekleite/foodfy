const express = require("express");

const GlobalController = require("./app/controllers/GlobalController");
const RecipeController = require("./app/controllers/RecipeController");
const ChefController = require("./app/controllers/ChefController");
const RecipeAdminController = require("./app/controllers/RecipeAdminController");
const ChefAdminController = require("./app/controllers/ChefAdminController");

const multer = require("./app/middlewares/multer");

const routes = express.Router();

routes.get("/", GlobalController.index);
routes.get("/about", GlobalController.about);

routes.get("/recipes", RecipeController.index);
routes.get("/recipes/:id", RecipeController.show);

routes.get("/admin/recipes", RecipeAdminController.index);
routes.get("/admin/recipes/create", RecipeAdminController.create);
routes.post("/admin/recipes", multer.array("photos", 5), RecipeAdminController.post);
routes.get("/admin/recipes/:id", RecipeAdminController.show);
routes.get("/admin/recipes/:id/edit", RecipeAdminController.edit);
routes.put("/admin/recipes", multer.array("photos", 5), RecipeAdminController.put);
routes.delete("/admin/recipes", RecipeAdminController.delete);

routes.get("/chefs", ChefController.index);

routes.get("/admin/chefs", ChefAdminController.index);
routes.get("/admin/chefs/create", ChefAdminController.create);
routes.post("/admin/chefs", multer.array("photos", 1), ChefAdminController.post);
routes.get("/admin/chefs/:id", ChefAdminController.show);
routes.get("/admin/chefs/:id/edit", ChefAdminController.edit);
routes.put("/admin/chefs", multer.array("photos", 1), ChefAdminController.put);
routes.delete("/admin/chefs", ChefAdminController.delete);

module.exports = routes;