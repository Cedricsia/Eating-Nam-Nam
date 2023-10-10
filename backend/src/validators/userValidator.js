const Joi = require("joi");

const checkUser = (req, res, next) => {
  const userSchema = Joi.object({
    firstname: Joi.string().max(45).required(),

    lastname: Joi.string().max(45).required(),

    pseudo: Joi.string().max(45).required(),

    creationMail: Joi.string().email({ minDomainSegments: 2 }),

    password: Joi.string()
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),

    confirmPassword: Joi.ref("password"),
  }).with("password", "confirmPassword");

  const user = req.body;

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    res.status(500).json({ validationErrors: error.details });
  } else {
    next();
  }
};
module.exports = checkUser;
