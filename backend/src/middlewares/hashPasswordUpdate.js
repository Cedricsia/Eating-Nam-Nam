const { hash } = require("../helpers/hashingHelpers");
const models = require("../models");

const hashPasswordUpdate = async (req, res, next) => {
  const [passwordInDatabase] = await models.user.findHashedPassword(
    req.body.id
  );

  if (passwordInDatabase !== req.body.password) {
    const hashedPassword = await hash(req.body.password);
    req.body.password = hashedPassword;
  }
  next();
};

module.exports = hashPasswordUpdate;
