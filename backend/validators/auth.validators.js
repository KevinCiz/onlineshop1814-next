const {check} = require("express-validator");

const userSignUpValidator = [
    check('name').not().isEmpty().withMessage("Name is required"),
    check('email').isEmail().withMessage("Email is not valid"),
    check('password').isLength({min:6}).withMessage("Password must be at least 6 characters"),
]

const userSignInValidator = [
    check('email').isEmail().withMessage("Email is not valid"),
    check('password').isLength({min:6}).withMessage("Password is INCORRECT"),
]

module.exports = {
    userSignUpValidator,
    userSignInValidator
}
