const { hash } = require("../helpers/hashingHelpers");

const hashPassword = async (req, res, next) => {
  const hashedPassword = await hash(req.body.password);

  req.body.password = hashedPassword;

  next();
};

module.exports = hashPassword;
