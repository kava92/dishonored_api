const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  gender: { type: String, reuqired: true },
  english: { type: Number, required: true },
  characterId: { type: String, required: true },
  addonsDesc: { type: String, required: true },
  screenshotUI: { type: String, required: true },
  statsPrioDesc: { type: String, required: true },
  rotationDesc: { type: String, required: true },
  optimalizeDesc: { type: String, required: true },
  raidingExp: { type: String, required: true },
  vanillaExp: { type: String, required: true },
  otherExp: { type: String, required: true },
  confirmFristParagraph: { type: Boolean, required: true },
  raidTimes: { type: Boolean, required: true },
  discordAttendace: { type: Boolean, required: true },
  communicationHeadset: { type: Boolean, required: true },
  internetConnection: { type: Boolean, required: true },
  explanation: { type: String },
  preparation: { type: String, required: true },
  whyWeShouldAdd: { type: String, required: true },
  extraInfo: { type: String }

  // english should has values from range 1-5
  // consider to get those items in to seperate array records in Schema
});

module.exports = mongoose.model("Application", applicationSchema);
