const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    company: {
      type: String,
    },
    category: {
      type: Array,
    },
    last_viewed: {
      type: Date,
      default: Date.now,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
