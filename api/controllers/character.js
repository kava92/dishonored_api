const mongoose = require("mongoose");

const Character = require("../models/character");

exports.character_get_all = (req, res, next) => {
  Character.find()
    .select("name price _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(docs => {
          return {
            ...docs
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

exports.character_get_byId = (req, res, next) => {
  const id = req.params.characterId;
  Character.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({ doc });
      } else {
        res.status(404).json({ message: "No valid entry for provided ID" });
      }
    })
    .catch(errors => {
      console.log(errors);
      res.status(500).json({ error: errors });
    });
};

exports.character_create = (req, res, next) => {
  const character = new Character({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    priority: req.body.priority,
    class: req.body.class,
    currentLvl: req.body.currentLvl,
    mainSpec: req.body.mainSpec,
    offSpec: req.body.offSpec,
    race: req.body.race,
    professions: req.body.professions,
    talents: req.body.talents
  });

  character
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created character sucessfully successfully",
        createdCharacter: result
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};
