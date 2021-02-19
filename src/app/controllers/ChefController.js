const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");
const File = require("../models/File");

module.exports = {
  async index(req, res) {
    let results = await Chef.getTotalRecipes();
    const chefs = results.rows;

    if (!chefs) return res.send("Chefs not found!");

    async function getImage(chefId) {
      let result = await Chef.files(chefId);

      const files = result.rows.map((file) => {
        return `${req.protocol}://${req.headers.host}${file.path.replace(
          "public",
          ""
        )}`;
      });

      return files[0];
    }

    const chefsPromise = chefs.map(async (chef) => {
      chef.avatar = await getImage(chef.id);

      return chef;
    });

    const chefsWithAvatar = await Promise.all(chefsPromise);

    return res.render("user/chefs", { chefs: chefsWithAvatar });
  },

  async show(req, res) {
    const { id } = req.params;

    let result = await Chef.find(id);
    const chef = result.rows[0];

    if (!chef) return res.send("Chef not found!");

    results = await Recipe.findByChef(chef.id);
    let recipes = results.rows;
    
    result = await Chef.files(chef.id);

    const files = result.rows.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

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

    recipes = await Promise.all(recipesPromise);

    return res.render("user/chef", { chef, recipes: recipes, files });
  },
};
