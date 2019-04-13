const Application = require("../models/application");
const mongoose = require("mongoose");

exports.application_get_all = (req, res, next) => {
  Application.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        applications: docs.map(doc => {
          return {
            ...doc._doc
          };
        })
      };
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};

exports.application_create = (req, res, next) => {
  const application = new Application({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId, // consider this field
    name: req.body.name,
    age: req.body.age,
    country: req.body.country,
    gender: req.body.gender,
    english: req.body.english,
    characterId: req.body.characterId, // consider this filed
    addonsDesc: req.body.addonsDesc,
    screenshotUI: req.body.screenshotUI,
    statsPrioDesc: req.body.statsPrioDesc,
    rotationDesc: req.body.rotationDesc,
    optimalizeDesc: req.body.optimalizeDesc,
    raidingExp: req.body.raidingExp,
    vanillaExp: req.body.vanillaExp,
    otherExp: req.body.otherExp,
    confirmFristParagraph: req.body.confirmFristParagraph,
    raidTimes: req.body.raidTimes,
    discordAttendace: req.body.discordAttendace,
    communicationHeadset: req.body.communicationHeadset,
    internetConnection: req.body.internetConnection,
    explanation: req.body.explanation,
    preparation: req.body.preparation,
    whyWeShouldAdd: req.body.whyWeShouldAdd,
    extraInfo: req.body.extraInfo
  });

  application
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created application sucessfully successfully",
        createdApplication: result
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};
