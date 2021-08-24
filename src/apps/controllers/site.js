const mongoose = require("mongoose");

const productModel = mongoose.model("Product");
const categoryModel = mongoose.model("Category");
const commentModel = mongoose.model("Comment");

const paginate = require("../../common/paginate");

module.exports.home = async (req, res) => {
  const products = await productModel.find().sort("-_id").limit(6);
  const productFeatureds = await productModel
    .find({ prd_featured: true })
    .sort("-_id")
    .limit(6);

  res.render("site/index", { products, productFeatureds });
};
module.exports.category = async (req, res) => {
  const id = req.params.id;

  const page = parseInt(req.query.page) || 1;
  const limit = 2;
  const skip = limit * page - limit;
  const filter = {
    cat_id: id,
  };
  const total = await productModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total / limit);
  const products = await productModel
    .find(filter)
    .sort("-_id")
    .skip(skip)
    .limit(limit);
  const category = await categoryModel.findById(id);
  res.render("site/category", {
    category,
    products,
    total,
    totalPage,
    page,
    pages: paginate(page, totalPage),
  });
};
module.exports.search = async (req, res) => {
  const keyword = req.query.keyword;
  const page = parseInt(req.query.page) || 1;
  const limit = 2;
  const skip = limit * page - limit;
  const filter = {};

  if (keyword) {
    filter["$text"] = {
      $search: keyword,
    };
  }
  const total = await productModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total / limit);

  const products = await productModel
    .find(filter)
    .sort("-_id")
    .skip(skip)
    .limit(limit);

  res.render("site/search", {
    keyword,
    products,
    total,
    totalPage,
    page,
    pages: paginate(page, totalPage),
  });
};

module.exports.product = async (req, res) => {
  const id = req.params.id;
  const product = await productModel.findById(id);

  const filter = { prd_id: id };
  const page = parseInt(req.query.page) || 1;
  const limit = 2;
  const skip = limit * page - limit;
  const total = await commentModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total / limit);

  const comments = await commentModel
    .find(filter)
    .sort("-_id")
    .skip(skip)
    .limit(limit);

  res.render("site/product", {
    product,
    comments,
    totalPage,
    page,
    pages: paginate(page, totalPage),
  });
};

module.exports.comment = async (req, res) => {
  const body = req.body;

  const comment = {
    name: body.comm_name,
    email: body.comm_mail,
    content: body.comm_details,
    prd_id: body.prd_id,
  };

  await new commentModel(comment).save();

  res.redirect(`/product.${body.prd_id}#comments-list`);
};

module.exports.cart = async (req, res) => {
  const cart = req.session.cart;

  res.render("site/cart", { cart, totalPrice: 0 });
};
module.exports.orderSuccess = (req, res) => {};

module.exports.addToCart = async (req, res) => {
  const cart = req.session.cart;
  const body = req.body;

  let isProductExists = false;

  cart.map((item) => {
    if (!isProductExists && body.prd_id === item.id) {
      isProductExists = true;
      item.qty += parseInt(body.qty);
    }
    return item;
  });

  if (!isProductExists) {
    const product = await productModel.findById(body.prd_id);

    cart.push({
      id: body.prd_id,
      qty: parseInt(body.qty),
      img: product.prd_image,
      name: product.prd_name,
      price: product.prd_price,
    });
  }

  req.session.cart = cart;

  res.redirect(`/product.${body.prd_id}`);
};
module.exports.updateCart = (req, res) => {
  const body = req.body;
  const items = body.items;
  const cart = req.session.cart;

  cart.map((item) => {
    if (items[item.id]) {
      item.qty = parseInt(items[item.id]);
    }
    return item;
  });

  req.session.cart = cart;
  res.redirect("/cart");
};

module.exports.deleteCart = (req, res) => {
  const id = req.params.id;
  req.session.cart = req.session.cart.filter((item) => item.id !== id);
  res.redirect("/cart");
};
