const models = require("../models");

const CheckUserDoesntExist = async (req, res, next) => {
  const [user] = await models.user.findOneByEmail(req.body.creationMail);

  if (user.length) return res.sendStatus(500);

  return next();
};

module.exports = CheckUserDoesntExist;
