const Joi = require("joi");

const checkLogin = (req, res, next) => {
  const loginSchema = Joi.object({
    mailConnection: Joi.string().email({ minDomainSegments: 2 }),

    passwordConnection: Joi.string().required(),
  });

  const user = req.body;
  const { error } = loginSchema.validate(user);

  if (error) {
    res.sendStatus(500);
  } else {
    next();
  }
};

module.exports = checkLogin;
