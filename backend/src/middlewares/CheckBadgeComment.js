const models = require("../models");
const checkAndAssignBadge = require("../helpers/checkAndAssignBadge");

const checkBadgeComment = async (req, res, next) => {
  const badgeRules = [
    { numComments: 4, badgeId: 7 },
    { numComments: 9, badgeId: 8 },
    { numComments: 14, badgeId: 9 },
  ];

  const postedCommentBadgeRules = [
    { numComments: 0, badgeId: 4 },
    { numComments: 1, badgeId: 5 },
    { numComments: 2, badgeId: 6 },
  ];
  try {
    const comment = req.body;
    const { userId, recipeId } = comment;

    const postedComment = await models.comment.findWithUserId(userId);

    const countCommentRecipe = await models.comment.findCountComment(
      parseInt(recipeId, 10)
    );

    badgeRules.forEach(async (rule) => {
      if (
        countCommentRecipe[0].length === rule.numComments &&
        countCommentRecipe[0].length > 0
      ) {
        const { userRecipeId } = countCommentRecipe[0][0];

        await checkAndAssignBadge(rule.badgeId, userRecipeId);
      }
    });

    postedCommentBadgeRules.forEach(async (rule) => {
      if (postedComment[0].length === rule.numComments) {
        await checkAndAssignBadge(rule.badgeId, userId);
      }
    });

    next();
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    res.status(500).json({ error: "Une erreur s'est produite." });
  }
};

module.exports = checkBadgeComment;
