const express = require("express");

const router = express.Router();

const teamController = require("../controllers/teamController");

router.get("/team", teamController.browse);

module.exports = router;
