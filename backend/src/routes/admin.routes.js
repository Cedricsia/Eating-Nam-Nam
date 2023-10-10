const express = require("express");

const router = express.Router();

const checkAdmin = require("../middlewares/checkAdminExist");

const authorization = require("../middlewares/authorization");

const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const recipeController = require("../controllers/recipeController");
const commentController = require("../controllers/commentController");
const fileUpload = require("../middlewares/multer");
const checkRecipeIngredient = require("../middlewares/checkRecipIngredient");
const checkRecipeLabel = require("../middlewares/checkRecipeLabel");
const checkRecipe = require("../middlewares/checkRecipe");

router.get("/", authorization, checkAdmin, adminController.browse);
router.get("/users", authorization, checkAdmin, userController.browse);

router.put(
  "/user/:id",
  authorization,
  checkAdmin,
  userController.editUserInformations
);
router.delete("/user/:id", authorization, checkAdmin, userController.destroy);

router.put(
  "/recipes/:id",
  authorization,
  checkAdmin,
  fileUpload.single("file"),
  checkRecipe,
  checkRecipeIngredient,
  checkRecipeLabel,
  adminController.edit
);

router.delete(
  "/recipe/:id",
  authorization,
  checkAdmin,
  recipeController.destroy
);

router.delete(
  "/ingredient/:id",
  authorization,
  checkAdmin,
  recipeController.destroy
);

router.get(
  "/comments",
  authorization,
  checkAdmin,
  commentController.findAllCommentsByUserAndRecipe
);
router.delete(
  "/comment/:id",
  authorization,
  checkAdmin,
  commentController.destroyComment
);

module.exports = router;
