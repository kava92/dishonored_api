const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRoutes = require("./api/routes/products");
const userRoutes = require("./api/routes/user");
const characterRoutes = require("./api/routes/character");
const applicationRoutes = require("./api/routes/application");

mongoose.connect(
  "mongodb+srv://admin:" +
    process.env.MONGO_ATLAS_PW +
    "@dishonored-db-jv6ej.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productsRoutes); // thats why u dont have to use in products /products cause it would be like /products/products!!
app.use("/user", userRoutes);
app.use("/character", characterRoutes);
app.use("/application", applicationRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.satus || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
