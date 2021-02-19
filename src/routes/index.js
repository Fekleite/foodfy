const express = require("express");

const routes = express.Router();

const HomeController = require("../app/controllers/HomeController");
const InstitutionalController = require("../app/controllers/InstitutionalController");

const users = require("./users");
const admin = require("./admin");
const recipes = require("./recipes");
const chefs = require("./chefs");

routes.get("/", HomeController.index);
routes.get("/about", InstitutionalController.about);

routes.use("/users", users);
routes.use("/admin", admin);
routes.use("/recipes", recipes);
routes.use("/chefs", chefs);

module.exports = routes;