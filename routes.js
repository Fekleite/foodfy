const express = require("express");
const fs = require("fs");

const routes = express.Router();

const data = require("./data.json");

// User routes

routes.get("/", (req, res) => {
  return res.render("user/home", { recipes: data.recipes });
});

routes.get("/about", (req, res) => {
  return res.render("user/about");
});

routes.get("/recipes", (req, res) => {
  return res.render("user/recipes", { recipes: data.recipes });
});

routes.get("/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const recipe = data.recipes[recipeIndex];

  return res.render("user/detail", { recipe });
});

// Admin routes

routes.get("/admin/recipes", (req, res) => {
  return res.render("admin/index", { recipes: data.recipes });
});

routes.get("/admin/recipes/create", (req, res) => {
  return res.render("admin/create");
});

routes.post("/admin/recipes", (req, res) => {
  const keys = Object.keys(req.body);

  let { image, title, author, ingredients, preparation, information } = req.body;

  keys.map((key) => {
    if (req.body[key] === "") {
      return res.send("Please, fill all fields!");
    }
  });

  id = Number(data.recipes.length + 1);

  data.recipes.push({ id, image, title, author, ingredients, preparation, information});

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/admin/recipes");
  });
});

routes.get("/admin/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index - 1;
  const recipe = data.recipes[recipeIndex];

  return res.render("admin/show", { recipe });
});

routes.get("/admin/recipes/:index/edit", (req, res) => {
  const recipeIndex = req.params.index;
  const tIndex = Number(recipeIndex) - 1;
  const recipe = data.recipes[tIndex];

  if (!recipe) return res.send("Recipe not found!");

  return res.render("admin/edit", { recipe });
});

routes.put("/admin/recipes", (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundRecipe = data.recipes.find((recipe, foundIndex) => {
    if (recipe.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundRecipe) return res.send("Recipe not found!");

  const recipe = {
    ...foundRecipe,
    ...req.body,
    id: Number(req.body.id),
  };

  data.recipes[index] = recipe;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/admin/recipes");
  });
});



module.exports = routes;