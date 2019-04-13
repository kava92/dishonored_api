const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth.js");
const applicationController = require("../controllers/application");

// get all applications
router.get("/", checkAuth, applicationController.application_get_all);

// create  application
router.post("/", checkAuth, applicationController.application_create);

module.exports = router;
