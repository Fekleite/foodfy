const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");

module.exports = {
  async index(req, res) {
    let result = await Recipe.all();
    const recipes = result.rows;

    if (!recipes) return res.send("Recipes not found!");

    async function getImage(recipeId) {
      let result = await Recipe.files(recipeId);

      const files = result.rows.map((file) => {
        return `${req.protocol}://${req.headers.host}${file.path.replace(
          "public",
          ""
        )}`;
      });

      return files[0];
    }

    const recipesPromise = recipes.map(async (recipe) => {
      recipe.img = await getImage(recipe.id);
      
      const recipeAuthor = await Chef.find(recipe.chef_id)
      recipe.author = recipeAuthor.rows[0].name;

      return recipe;
    });

    const lastAdded = await Promise.all(recipesPromise);

    return res.render("user/home", { recipes: lastAdded.slice(0, 3) });
  }
};
