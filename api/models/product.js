const mongoose = require("mongoose");

const prodcutSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Product", prodcutSchema);
