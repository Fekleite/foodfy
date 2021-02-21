const User = require("../models/User");
const { index } = require("./RecipeAdminController");

module.exports = {
  async index(req, res) {
    return res.render("admin/users/index");
  },

  async create(req, res) {
    return res.render("admin/users/create");
  },

  async post(req, res) {
    await User.create(req.body)

    return res.redirect("/admin/users");
  }
};
