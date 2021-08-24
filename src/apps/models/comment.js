const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    content: String,
    prd_id: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Comment", CommentSchema, "comments");
