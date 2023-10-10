const Joi = require("joi");

const checkUserUpdate = (req, res, next) => {
  const userSchema = Joi.object({
    id: Joi.number(),

    firstname: Joi.string().max(45),

    lastname: Joi.string().max(45),

    pseudo: Joi.string().max(45),

    mail: Joi.string().email({ minDomainSegments: 2 }),

    gender: [Joi.string().optional(), Joi.allow(null)],

    socio: [Joi.string().optional(), Joi.allow(null)],

    age: [Joi.string().optional(), Joi.allow(null)],

    creation_date: Joi.string(),

    image: Joi.string(),

    role: Joi.string(),

    password: Joi.string().pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    ),

    confirmPassword: [
      Joi.string().optional().valid(Joi.ref("password")),
      Joi.allow(""),
    ],
  }).with("password", "confirmPassword");

  const user = req.body;

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    res.status(500).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = checkUserUpdate;
