const router = require("express").Router();

const { signup, signin, signout, requireSignin } = require("../controllers/auth.controllers");

// Validation
const { runValidation } = require("../validators");
const { userSignUpValidator, userSignInValidator } = require("../validators/auth.validators");

router.post("/signup", userSignUpValidator, runValidation, signup);
router.post("/signin", userSignInValidator, runValidation, signin);
router.get("/signout", signout)

// test
router.get("/secret", requireSignin, (req,res) => {
    res.json({
        message: "you have access to private page"
    })
})

module.exports = router;
