const express = require("express");

const GlobalController = require("./app/controllers/GlobalController");
const RecipeController = require("./app/controllers/RecipeController");
const AdminController = require("./app/controllers/AdminController");

const multer = require("./app/middlewares/multer");

const routes = express.Router();

routes.get("/", GlobalController.index );
routes.get("/about", GlobalController.about);

routes.get("/recipes", RecipeController.index);
routes.get("/recipes/:id", RecipeController.show);

routes.get("/admin/recipes", AdminController.index);
routes.get("/admin/recipes/create", AdminController.create);
routes.post("/admin/recipes", multer.array("photos", 5), AdminController.post);
routes.get("/admin/recipes/:id", AdminController.show);
routes.get("/admin/recipes/:id/edit", AdminController.edit);
routes.put("/admin/recipes", multer.array("photos", 5), AdminController.put);
routes.delete("/admin/recipes", AdminController.delete);


module.exports = routes;