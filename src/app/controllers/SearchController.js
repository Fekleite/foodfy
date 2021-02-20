const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");

module.exports = {
  async index(req, res) {
    try {
      let { filter } = req.query;

      if (!filter) return res.redirect("/recipes");

      let results = await Recipe.search(filter);
      const filteredRecipes = results.rows;

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
  
      const recipesPromise = filteredRecipes.map(async (recipe) => {
        recipe.img = await getImage(recipe.id);
        
        const recipeAuthor = await Chef.find(recipe.chef_id)
        recipe.author = recipeAuthor.rows[0].name;
  
        return recipe;
      });
  
      const recipes = await Promise.all(recipesPromise);

      return res.render("recipes/search", { recipes, filter });
    } catch (error) {
      console.log(`Search error: ${error}`);
    }
  },
};
