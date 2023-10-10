const express = require("express");

const router = express.Router();

const ingredientController = require("../controllers/ingredientController");

router.get("/ing", ingredientController.searchOne);
router.get("/ingredient", ingredientController.browse);
router.post("/ingredient", ingredientController.add);
router.get("/ingredient/:id", ingredientController.read);
router.delete("/ingredient/:id", ingredientController.destroy);
router.put("/ingredient/:id", ingredientController.edit);
router.get("/latest-ingredient", ingredientController.readLastTwentyIng);

module.exports = router;
