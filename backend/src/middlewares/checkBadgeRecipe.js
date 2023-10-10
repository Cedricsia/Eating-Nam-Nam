const models = require("../models");
const checkAndAssignBadge = require("../helpers/checkAndAssignBadge");

const checkRecipeBadge = async (req, res, next) => {
  const labelBadge = [
    { labelId: 20, badgeId: 14 },
    { labelId: 19, badgeId: 13 },
  ];

  const difficultyToBadge = {
    Facile: 10,
    Moyen: 11,
    Difficile: 12,
  };

  const numRecipesToBadges = [
    { numRecipes: 0, badgeId: 1 },
    { numRecipes: 1, badgeId: 2 },
    { numRecipes: 2, badgeId: 3 },
  ];
  try {
    const recipe = JSON.parse(req.body.recipe);
    const labels = JSON.parse(req.body.labels);
    const userId = recipe.user_id;
    const createdRecipes = await models.recipe.findRecipeCount2(userId);

    labelBadge.forEach(async (rule) => {
      if (labels.some((label) => label.label_id === rule.labelId)) {
        await checkAndAssignBadge(rule.badgeId, userId);
      }
    });

    const difficultyBadgeId = difficultyToBadge[recipe.difficulty];
    if (difficultyBadgeId) {
      await checkAndAssignBadge(difficultyBadgeId, userId);
    }

    numRecipesToBadges.forEach(async (rule) => {
      if (createdRecipes[0].length >= rule.numRecipes) {
        await checkAndAssignBadge(rule.badgeId, userId);
      }
    });

    next();
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    res.status(500).json({ error: "Une erreur s'est produite." });
  }
};

module.exports = checkRecipeBadge;
