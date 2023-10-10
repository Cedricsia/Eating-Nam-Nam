const models = require("../models");

const checkAndAssignBadge = async (badgeId, userId) => {
  const reqBadge = { user_id: userId, badge_id: badgeId };

  const checkIfExist = await models.user_badge.findExistingBadge(userId);

  if (checkIfExist[0].length === 0) {
    await models.user_badge.insert(reqBadge);
  }
  const checkallBadge = await models.user_badge.findAllbadgeUser(userId);
  if (checkallBadge[0].length === 14) {
    const allbadge = { user_id: userId, badge_id: 15 };
    await models.user_badge.insert(allbadge);
  }
};

module.exports = checkAndAssignBadge;
