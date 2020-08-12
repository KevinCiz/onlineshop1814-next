const {check} = require("express-validator");

const productRegisterValidator = [
    check('productid').not().isEmpty().withMessage("Product ID is required"),
    check('name').not().isEmpty().withMessage("Product Name is required"),
    check('details').not().isEmpty().withMessage("Product Details is required"),
    check('price').not().isEmpty().withMessage("Product Price is required"),
    check('image').not().isEmpty().withMessage("Product Image is required"),
    check('category').not().isEmpty().withMessage("Product Category is required"),
]

module.exports = {
    productRegisterValidator
}
