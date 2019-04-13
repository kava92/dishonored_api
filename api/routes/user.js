const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth.js");
const userControllers = require("../controllers/user");

router.get("/:userId", checkAuth, userControllers.user_get_byId);

router.patch("/:userId", checkAuth, userControllers.user_update_byId);

router.delete("/:userId", checkAuth, userControllers.user_delete_byId);

router.post("/signup", userControllers.user_signUp);

router.post("/login", userControllers.user_login);

module.exports = router;
