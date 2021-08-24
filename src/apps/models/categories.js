const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    cat_name: String,
  },
  {
    timestamps: true,
  }
);

mongoose.model("Category", CategorySchema, "categories");
