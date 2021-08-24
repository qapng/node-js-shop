const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_full: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      default: null,
    },
    user_mail: {
      type: String,
      unique: true,
      required: true,
    },
    user_pass: String,
    user_level: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("User", UserSchema, "users");
