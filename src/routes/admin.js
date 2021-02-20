const express = require("express");

const routes = express.Router();
const multer = require("../app/middlewares/multer");

const RecipeAdminController = require("../app/controllers/RecipeAdminController");
const ChefAdminController = require("../app/controllers/ChefAdminController");
const UserController = require("../app/controllers/UserController");
const ProfileController = require("../app/controllers/ProfileController");

const UserValidator = require("../app/validators/user");

// Recipes routes

routes.get("/recipes", RecipeAdminController.index);
routes.get("/recipes/create", RecipeAdminController.create);
routes.get("/recipes/:id", RecipeAdminController.show);
routes.get("/recipes/:id/edit", RecipeAdminController.edit);

routes.post("/recipes", multer.array("photos", 5), RecipeAdminController.post);
routes.put("/recipes", multer.array("photos", 5), RecipeAdminController.put);
routes.delete("/recipes", RecipeAdminController.delete);

// Chefs routes

routes.get("/chefs", ChefAdminController.index);
routes.get("/chefs/create", ChefAdminController.create);
routes.get("/chefs/:id", ChefAdminController.show);
routes.get("/chefs/:id/edit", ChefAdminController.edit);

routes.post("/chefs", multer.array("photos", 1), ChefAdminController.post);
routes.put("/chefs", multer.array("photos", 1), ChefAdminController.put);
routes.delete("/chefs", ChefAdminController.delete);

// User routes

// routes.get("/users", UserController.index);
routes.get("/users/register", UserController.create);
// routes.get("/users/update", UserController.edit);

routes.post("/users/register", UserValidator.post, UserController.post); 
// routes.put("/users", UserController.put); 
// routes.delete("/users", UserController.delete); 

// Profile routes

// routes.get("/profile", ProfileController.index);
// routes.put("/profile", ProfileController.put);

module.exports = routes;