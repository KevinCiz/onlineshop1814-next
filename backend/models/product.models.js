const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productid: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: [{ type: String }],
  category: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
  },
  redirectURL: {
    type: String,
    required: false,
    default: "",
  },
});

module.exports = model("products", productSchema);
