const express = require("express");

const router = express.Router();

const recipeLabelController = require("../controllers/recipeLabelController");

router.get(
  "/recipe-label-recipeId/:id",
  recipeLabelController.browseByrecipeId
);

module.exports = router;
