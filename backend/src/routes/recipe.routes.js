const express = require("express");

const router = express.Router();

const recipeController = require("../controllers/recipeController");
const fileUpload = require("../middlewares/multer");
const checkRecipeIngredient = require("../middlewares/checkRecipIngredient");
const checkRecipeLabel = require("../middlewares/checkRecipeLabel");
const checkRecipe = require("../middlewares/checkRecipe");
const checkUpload = require("../middlewares/checkUpload");
const authorization = require("../middlewares/authorization");
const checkRecipeBadge = require("../middlewares/checkBadgeRecipe");

router.get("/last-four-recipes", recipeController.readLastFourRecipes);
router.get("/most-popular-recipe", recipeController.readMostPopularRecipes);
router.get("/recipe-initial-portion/:id", recipeController.readInitialPortion);
router.get("/recipe-header/:id", recipeController.readRecipeHeader);
router.get("/recipe-steps/:id", recipeController.readSteps);
router.get("/recipe-nutrition/:id", recipeController.readNutrition);

// routes with authorization

router.post(
  "/recipes",
  authorization,
  fileUpload.single("file"),
  checkUpload,
  checkRecipe,
  checkRecipeIngredient,
  checkRecipeLabel,
  checkRecipeBadge,

  recipeController.add
);

router.put(
  "/recipes/:id",
  authorization,
  fileUpload.single("file"),
  checkRecipe,
  checkRecipeIngredient,
  checkRecipeLabel,
  recipeController.edit
);
router.get("/recipes/:id", authorization, recipeController.read);
router.put("/recipes/:id", authorization, recipeController.edit);
router.delete("/recipes/:id", authorization, recipeController.destroy);

router.get(
  "/recipes-favourite-user/:user_id",
  recipeController.readFavouriteRecipe
);
router.get("/recipes", authorization, recipeController.getLabel);
router.get(
  "/allFromRecipe/:id",

  recipeController.getAllFromRecipe
);
router.get(
  "/recipes-by-user/:user_id",
  authorization,
  recipeController.getByUser
);

module.exports = router;
