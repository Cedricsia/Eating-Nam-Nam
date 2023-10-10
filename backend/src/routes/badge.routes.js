const express = require("express");

const router = express.Router();

// const authorization = require("../middlewares/authorization");

const badgeController = require("../controllers/badgeController");

router.get("/badge", badgeController.browse);
router.put("/badge/:id", badgeController.edit);
router.delete("/badge/:id", badgeController.destroy);

module.exports = router;
