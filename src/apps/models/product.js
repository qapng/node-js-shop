const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  prd_name: {
    type: String,
    text: true,
  },
  prd_image: String,
  prd_price: Number,
  prd_warranty: String,
  prd_accessories: String,
  prd_new: String,
  prd_promotion: String,
  prd_status: Boolean,
  prd_featured: Boolean,
  prd_details: String,
  cat_id: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

mongoose.model("Product", ProductSchema, "products");
