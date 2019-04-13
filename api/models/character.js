const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  priority: { type: Number, required: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  race: { type: String, required: true },
  mainSpec: { type: String, required: true },
  offSpec: { type: String, required: true },
  currentLvl: { type: Number, required: true, min: 1, max: 60 },
  professions: { type: Array },
  talents: { type: String, required: true }
  // into priority add regex validation 0-1, 0-main, 1-alt, range ? default?
});

module.exports = mongoose.model("Character", characterSchema);
