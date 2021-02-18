const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");
const File = require("../models/File");

module.exports = {
  async index(req, res) {
    let result = await Chef.all();
    const chefs = result.rows;

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

    const lastAdded = await Promise.all(chefsPromise);

    return res.render("admin/chefs/index", { chefs: lastAdded });
  },

  async show(req, res) {
    const { id } = req.params;

    let result = await Chef.find(id);
    const chef = result.rows[0];

    if (!chef) return res.send("Chef not found!");

    results = await Recipe.findByChef(chef.id);
    const recipes = results.rows;
    
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

    const lastAdded = await Promise.all(recipesPromise);

    return res.render("admin/chefs/show", { chef, recipes: lastAdded, files });
  },

  async create(req, res) {
    let result = await Chef.all();
    const chefs = result.rows;

    return res.render("admin/chefs/create", { chefs });
  },

  async post(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "") {
        return res.send("Please, fill all fields!");
      }
    });

    if (req.files.length == 0) return res.send("Please, send at least one image.");

    let result = await Chef.create(req.body);

    const chefId = result.rows[0].id;

    const filesPromise = req.files.map((file) => {
      File.createImageChef({ ...file, chef_id: chefId });
    });

    await Promise.all(filesPromise);

    return res.redirect(`/admin/chefs/${chefId}`);
  },

  async edit(req, res) {
    const { id } = req.params;

    let result = await Chef.find(id);
    const chef = result.rows[0];

    result = await Chef.files(chef.id);

    const files = result.rows.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    return res.render("admin/chefs/edit", { chef, files });
  },

  async put(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "" && key != "removed_files") {
        return res.send("Please, fill all fields!");
      }
    });

    if (req.files.length !== 0) {
      const newFilesPromise = req.files.map(file => File.createImageChef({...file, chef_id: req.body.id}));

      await Promise.all(newFilesPromise);
    }

    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",");
      const lastIndex = removedFiles.length - 1;
      removedFiles.splice(lastIndex, 1);

      const removedFilesPromise = removedFiles.map(id => File.deleteImageChef(id));

      await Promise.all(removedFilesPromise);
    }

    await Chef.update(req.body);

    return res.redirect(`/admin/chefs/${req.body.id}`);
  },
  
  async delete(req, res) {
    await Chef.delete(req.body.id);

    return res.redirect(`/admin/chefs`);
  },
};
