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

routes.get("/recipes/:id", (req, res) => {
  const recipeId = Number(req.params.id);

  const foundRecipe = data.recipes.filter((recipe) => recipe.id === recipeId);

  if (!foundRecipe || foundRecipe.length === 0) return res.send("Recipe not found!");

  return res.render("user/detail", { recipe: foundRecipe[0] });
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

routes.get("/admin/recipes/:id", (req, res) => {
  const recipeId = Number(req.params.id);

  const foundRecipe = data.recipes.filter((recipe) => recipe.id === recipeId);

  if (!foundRecipe || foundRecipe.length === 0) return res.send("Recipe not found!");

  return res.render("admin/show", { recipe: foundRecipe[0] });
});

routes.get("/admin/recipes/:id/edit", (req, res) => {
  const recipeId = Number(req.params.id);

  const foundRecipe = data.recipes.filter((recipe) => recipe.id === recipeId);

  if (!foundRecipe || foundRecipe.length === 0) return res.send("Recipe not found!");

  return res.render("admin/edit", { recipe: foundRecipe[0] });
});

routes.put("/admin/recipes", (req, res) => {
  const { id } = req.body;
  const numberId = Number(id);

  const foundRecipe = data.recipes.filter((recipe) => recipe.id === numberId);

  if (!foundRecipe || foundRecipe.length === 0) return res.send("Recipe not found!");

  const recipe = {
    ...foundRecipe,
    ...req.body,
    id: numberId,
  };

  data.recipes[numberId - 1] = recipe;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/admin/recipes");
  });
});

routes.delete("/admin/recipes", (req, res) => {
  const { id } = req.body;
  const numberId = Number(id);

  const filteredRecipes = data.recipes.filter((recipe) => recipe.id !== numberId );

  data.recipes = filteredRecipes;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");

    return res.redirect("/admin/recipes");
  });
});



module.exports = routes;