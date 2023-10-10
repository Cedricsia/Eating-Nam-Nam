const express = require("express");

const router = express.Router();

const favContoller = require("../controllers/favController");

router.get("/favorite/:recipeId/:userId", favContoller.readByRecipeIdAndUserId);
router.delete("/favorite/:recipeId/:userId", favContoller.destroy);
router.post("/favorite/:recipeId/:userId", favContoller.add);

module.exports = router;
