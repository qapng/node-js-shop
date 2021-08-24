const mongoose = require("mongoose");

const UserModel = mongoose.model("User");

module.exports.getLogin = (req, res) => {
  res.render("login", { error: null });
};

module.exports.postLogin = async (req, res) => {
  const { mail, pass } = req.body;
  const { redirect } = req.query;

  let error;

  const user = await UserModel.findOne({ user_mail: mail });

  if (!user) {
    error = "Tài khoản không tồn tại!";
  }
  if (user && user.user_pass !== pass) {
    error = "Mật khẩu không đúng!";
  }

  if (error) {
    return res.render("login", { error });
  }

  req.session.user = user;
  res.redirect(redirect ? redirect : "/admin");

  // console.log("module.exports.postLogin -> user", user);
};

module.exports.logout = (req, res) => {
  delete req.session.user;
  return res.redirect("/login");
};
