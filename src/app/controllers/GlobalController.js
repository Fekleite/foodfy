const Recipe = require("../models/Recipe");

module.exports = {
  async index(req, res) {
    let result = await Recipe.all();
    const recipes = result.rows;

    if (!recipes) return res.send("Recipes not found!");

    return res.render("user/home", { recipes: recipes.slice(0, 3) });
  },

  about(req, res) {
    return res.render("user/about");
  },
};
