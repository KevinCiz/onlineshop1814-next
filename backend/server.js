const express = require("express");
const mongoose = require("mongoose");
const { success, error } = require("consola");
const cors = require("cors");

// Config
const { DB, PORT, NODE_ENV, CLIENT_URL } = require("./config");
const cookieParser = require("cookie-parser");

// Initialize
const app = express();

// Configure Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cors
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Import Routes
const productRoutes = require("./routes/product.routes")
const authRoutes = require("./routes/auth.routes")

// Routes Middleware
app.use('/api/products',productRoutes)
app.use('/api/auth', authRoutes)

// Routes
app.use("/", (req, res) => {
  res.send("Welcome to CMS App");
});

const startApp = async () => {
  // Connect to DB
  await mongoose
    .connect(DB, { useFindAndModify: true, useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => success({ message: `Successfully connected with mongoDB`, badge: true }))
    .catch((err) => error({ message: `Unable to connect to database ${err}`, badge: true }));

  app.listen(PORT, () => success({ message: `Server Running at PORT ${PORT}`, badge: true }));
};

startApp();
