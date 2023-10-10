const express = require("express");

const router = express.Router();

const recipeIngredientController = require("../controllers/recipeIngredientController");
const authorization = require("../middlewares/authorization");

router.get("/recipe-ingredient/:id", recipeIngredientController.searchByRecipe);

router.get(
  "/recipe_ingredient-recipeId/:id",
  recipeIngredientController.browseByrecipeId
);
router.get(
  "/recipe_ingredient",
  authorization,
  recipeIngredientController.browse
);
router.post(
  "/recipe_ingredient",
  authorization,
  recipeIngredientController.add
);

module.exports = router;
