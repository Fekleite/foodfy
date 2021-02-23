const User = require("../models/User");

function checkAllFields(body) {
  const keys = Object.keys(body);

  for (key of keys) {
    if (body[key] == "") {
      return { 
        user: body, 
        error: "Por favor, preencha todos os campos!" 
      };
    }
  }
}

async function post(req, res, next) {
  const fillAllFields = checkAllFields(req.body);

  if(fillAllFields) {
    return res.render("admin/users/create", fillAllFields);
  }

  const { email } = req.body;
  const user = await User.findbyEmail(email);
  
  if(user) return res.render("admin/users/create", { user: req.body, error: "Usuário já cadastrado!" });

  next();
}

async function put(req, res, next) {
  const fillAllFields = checkAllFields(req.body);

  if(fillAllFields) {
    return res.render("admin/users/edit", fillAllFields);
  }

  const { id, email } = req.body;
  const user = await User.findbyEmail(email);

  if (user) {
    if(user.id !== id) {
      return res.render("admin/users/edit", {
        user: req.body,
        error: "Este email já está sendo utilizado!"
      });
    }
  }

  next();
}

module.exports = {
  post,
  put
}