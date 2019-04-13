const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

exports.user_get_byId = (req, res, next) => {
  User.find({ _id: req.params.userId })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length, // zastanow sie czy to wogole potrzebujesz.
        user: docs.map(doc => {
          return {
            name: doc.email,
            _id: doc._id,
            characters: doc.characters,
            rank: doc.rank
          };
        })
      };
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.user_update_byId = (req, res, next) => {
  const id = req.params.userId;
  const updates = {};
  for (const ops of req.body) {
    updates[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updates })
    .exec()
    .then(response => {
      console.log("User updated successfully", response);
      res.status(200).json({ message: "User updated successfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.user_delete_byId = (req, res, next) => {
  User.remove({ _id: req.params.id })
    .exec()
    .then(response => res.status(200).json({ message: "User deleted" }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.user_signUp = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "Mail exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res
                  .status(201)
                  .json({ message: `User ${req.body.email} created` });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(users => {
      console.log(users);
      if (users.length < 1) {
        return res.status(401).json({ message: "Auth failed" });
      } else {
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: users[0].email,
                userId: users[0]._id
              },
              process.env.JWT_KEY,
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
