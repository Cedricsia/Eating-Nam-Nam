const express = require("express");

const router = express.Router();

const labelController = require("../controllers/labelController");

router.get("/labels-recipe/:id", labelController.readByRecipe);

router.get("/label", labelController.browse);

module.exports = router;
