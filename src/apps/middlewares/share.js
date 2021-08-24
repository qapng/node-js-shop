const c = require("config");
const mongoose = require("mongoose");

const categoryModel = mongoose.model("Category");
module.exports = async function (req, res, next) {
  res.locals.categories = await categoryModel.find();
  res.locals.totalCartItem = req.session.cart.reduce((a, c) => a + c.qty, 0);
  next();
};
