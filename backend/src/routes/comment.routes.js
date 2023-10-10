const express = require("express");

const router = express.Router();

const commentController = require("../controllers/commentController");
const authorization = require("../middlewares/authorization");
const checkComment = require("../validators/commentValidator");
const checkBadgeComment = require("../middlewares/CheckBadgeComment");

router.get("/rate/:id", commentController.getAverageRating);
router.get("/comment-rate/:id", commentController.findCommentAndRateByRecipeId);

router.post(
  "/comments",
  authorization,
  checkBadgeComment,
  checkComment,
  commentController.add
);
router.put("/comments", authorization, checkComment, commentController.edit);
router.delete(
  "/comments/:recipeId/:userId",
  authorization,
  commentController.destroy
);

router.get("/comment/:recipeId/:userId", authorization, commentController.read);

module.exports = router;
