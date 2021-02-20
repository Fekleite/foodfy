const User = require("../models/User");

async function post(req, res, next) {
  const keys = Object.keys(req.body);

  keys.map((key) => {
    if (req.body[key] === "") {
      return res.render("admin/users/create", { user: req.body, error: "Por favor, preencha todos os campos!" });
    }
  });

  const { email } = req.body;
  const user = await User.findbyEmail(email);
  
  if(user) return res.render("admin/users/create", { user: req.body, error: "Usuário já cadastrado!" });

  next();
}

module.exports = {
  post
}