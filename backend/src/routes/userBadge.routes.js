const express = require("express");

const router = express.Router();

const authorization = require("../middlewares/authorization");

const userBadgeController = require("../controllers/userBadgeController");

router.get("/userBadge", authorization, userBadgeController.browse);
router.put("/userBadge/:id", authorization, userBadgeController.edit);
router.delete("/userBadge/:id", authorization, userBadgeController.destroy);

module.exports = router;
