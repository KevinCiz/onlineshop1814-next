const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  getSpecificProduct,
} = require("../controllers/product.controllers");
const { requireSignin } = require("../controllers/auth.controllers");

// Validation
const { runValidation } = require("../validators");
const { productRegisterValidator } = require("../validators/product.validators");

router.post("/register", productRegisterValidator, runValidation, createProduct);

router.get("/all-products", getProduct);
router.post("/product", getSpecificProduct);

module.exports = router;
