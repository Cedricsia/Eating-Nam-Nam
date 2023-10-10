const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const fileUpload = require("../middlewares/multer");
const checkUserUpdate = require("../validators/userValidatorUpdate");
const hashedPasswordUpdate = require("../middlewares/hashPasswordUpdate");
const hashedPasswordUpdateWithPicture = require("../middlewares/hashPasswordUpdateWithPicture");

router.get("/users", userController.browse);
router.get("/users/search", userController.searchAll);
router.get("/users/:id", userController.read);
router.put(
  "/users/:id",
  fileUpload.single("file"),
  hashedPasswordUpdateWithPicture,
  userController.edit
);
router.put(
  "/user-password/:id",
  checkUserUpdate,
  hashedPasswordUpdate,
  userController.editPassword
);
router.put(
  "/userswithoutPicture/:id",
  checkUserUpdate,
  hashedPasswordUpdate,
  userController.editWithoutPicture
);
router.post("/users", userController.add);
router.delete("/users/:id", userController.destroy);
router.get("/users-by-recipe", userController.findNumberOfRecipeByUser);
router.get("/users-badges", userController.searchAllBadge);
router.get("/users-badges/:id", userController.searchAllBadgeParams);

module.exports = router;
