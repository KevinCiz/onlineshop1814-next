const User = require("../models/user.models");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { SECRET_KEY } = require("../config/index");

const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is already in use",
      });
    }

    const { name, username, email, password } = req.body;
    let userid = shortId.generate();
    let role = 1;

    let newUser = new User({
      name,
      username,
      email,
      password,
      role,
      userid,
    });
    console.log(newUser);
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        message: "Sign Up success",
        user: success,
      });
    });
  });
};

const signin = (req, res) => {
  const { email, password } = req.body;
  // Check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email does not exist",
      });
    }
    // Authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email & password do not match",
      });
    }

    // Generate jwt and send to client
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "1d" });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, userid, username, name, email, role } = user;
    return res.json({
      token,
      user: {
        _id,
        userid,
        username,
        name,
        email,
        role,
      },
    });
  });
};

const signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout Success",
  });
};

const requireSignin = expressJwt({
  secret: SECRET_KEY,
  algorithms: ["HS256"],
});

module.exports = {
  signup,
  signin,
  signout,
  requireSignin,
};
