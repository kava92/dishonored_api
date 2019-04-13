const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth.js");

const characterController = require("../controllers/character");

// do you really need this ? get all chracters
router.get("/", characterController.character_get_all);
// get character by Id
router.get("/:characterId", characterController.character_get_byId);
//create character
router.post("/", checkAuth, characterController.character_create);

module.exports = router;
