const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");

module.exports = {
  async index(req, res) {
    let result = await Recipe.all();
    const recipes = result.rows;

    if (!recipes) return res.send("Recipes not found!");

    return res.render("user/recipes", { recipes });
  },

  async show(req, res) {
    const { id } = req.params;

    let result = await Recipe.find(id);
    const recipe = result.rows[0];

    results = await Chef.find(recipe.chef_id);
    const chef = result.rows[0];

    return res.render("user/detail", { recipe, chef });
  },
};
