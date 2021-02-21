const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const users = await User.all()

    return res.render("admin/users/index", { users });
  },

  async create(req, res) {
    return res.render("admin/users/create");
  },

  async post(req, res) {
    await User.create(req.body)

    return res.redirect("/admin/users");
  },

  async edit(req, res) {
    const { id } = req.params;

    let user = await User.find(id)

    return res.render("admin/users/edit", { user });
  },

  async put(req, res) {
    await User.update(req.body)

    return res.redirect("/admin/users");
  },

  async delete(req, res) {
    await User.delete(req.body.id)

    return res.redirect("/admin/users");
  },
};
