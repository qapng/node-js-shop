module.exports = function (req, res, next) {
  const user = req.session.user;

  if (user.user_level === 1) {
    return next();
  }
  return res.redirect("/");
};
