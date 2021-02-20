const User = require("../models/User");

module.exports = {
  async create(req, res) {
    return res.render("admin/users/create");
  },

  async post(req, res) {
    return res.send("Passed");
  }
};
