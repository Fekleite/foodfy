const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");
const File = require("../models/File");

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

    return res.render("admin/recipes/index", { recipes: lastAdded });
  },

  async show(req, res) {
    const { id } = req.params;

    let result = await Recipe.find(id);
    const recipe = result.rows[0];

    if (!recipe) return res.send("Recipe not found!");

    result = await Chef.find(recipe.chef_id);
    const chef = result.rows[0];

    result = await Recipe.files(recipe.id);

    const files = result.rows.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    return res.render("admin/recipes/show", { recipe, chef, files });
  },

  async create(req, res) {
    let result = await Chef.all();
    const chefs = result.rows;

    return res.render("admin/recipes/create", { chefs });
  },

  async post(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "") {
        return res.send("Please, fill all fields!");
      }
    });

    if (req.files.length == 0) return res.send("Please, send at least one image.");

    let result = await Recipe.create(req.body);

    const recipeId = result.rows[0].id;

    const filesPromise = req.files.map((file) => {
      File.createImageRecipe({ ...file, recipe_id: recipeId });
    });

    await Promise.all(filesPromise);

    return res.redirect(`/admin/recipes/${recipeId}`);
  },

  async edit(req, res) {
    const { id } = req.params;

    let result = await Recipe.find(id);
    const recipe = result.rows[0];

    result = await Chef.all();
    const chefs = result.rows;

    result = await Recipe.files(recipe.id);

    const files = result.rows.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    return res.render("admin/recipes/edit", { recipe, chefs, files });
  },

  async put(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "" && key != "removed_files") {
        return res.send("Please, fill all fields!");
      }
    });

    if (req.files.length !== 0) {
      const newFilesPromise = req.files.map(file => File.createImageRecipe({...file, recipe_id: req.body.id}));

      await Promise.all(newFilesPromise);
    }

    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",");
      const lastIndex = removedFiles.length - 1;
      removedFiles.splice(lastIndex, 1);

      const removedFilesPromise = removedFiles.map(id => File.deleteImageRecipe(id));

      await Promise.all(removedFilesPromise);
    }

    await Recipe.update(req.body);

    return res.redirect(`/admin/recipes/${req.body.id}`);
  },
  
  async delete(req, res) {
    await Recipe.delete(req.body.id);

    return res.redirect(`/admin/recipes`);
  },
};
