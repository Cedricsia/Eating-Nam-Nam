const { hash } = require("../helpers/hashingHelpers");
const models = require("../models");

const hashPasswordUpdateWithPicture = async (req, res, next) => {
  const user = JSON.parse(req.body.user);

  const checkPassword = user.password;

  const [passwordInDatabase] = await models.user.findHashedPassword(user.id);

  if (passwordInDatabase[0].password !== checkPassword) {
    const hashedPassword = await hash(checkPassword);
    req.body.password = hashedPassword;
  }
  next();
};

module.exports = hashPasswordUpdateWithPicture;
