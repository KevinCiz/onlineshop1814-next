const Product = require("../models/product.models");

const createProduct = (req, res) => {
  Product.findOne({ productid: req.body.productid }).exec((err, product) => {
    if (product) {
      return res.status(400).json({
        error: "Product Already in database",
      });
    }

    const { productid, name, details, price, image, category, redirectURL } = req.body;
    let active = 1;

    let newProduct = new Product({
      productid,
      name,
      details,
      price,
      image,
      category,
      redirectURL,
      active,
    });
    console.log(newProduct);
    newProduct.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        message: `Product ${product.productid} Successfully Created`,
        product: product,
      });
    });
  });
};

const getProduct = (req, res) => {
  Product.find().exec((err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ result: result, success: true });
  });
};

const getSpecificProduct = (req, res) => {
  Product.findOne({ productid: req.query.productid }).exec((err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ result , success: true });
  });
};

module.exports = {
  createProduct,
  getProduct,
  getSpecificProduct,
};
