const Chef = require("../models/Chef");

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

    const recipesPromise = chefs.map(async (chef) => {
      chef.avatar = await getImage(chef.id);

      return chef;
    });

    const lastAdded = await Promise.all(recipesPromise);

    return res.render("user/chefs", { chefs: lastAdded });
  },
};
