const Joi = require("joi");

const checkComment = (req, res, next) => {
  const commentSchema = Joi.object({
    recipeId: Joi.number().required(),

    userId: Joi.number().required(),

    newComment: Joi.string().max(255).required(),

    rate: Joi.number().required(),
  });

  const user = req.body;

  const { error } = commentSchema.validate(user, { abortEarly: false });

  if (error) {
    res.status(500).json({ validationErrors: error.details });
  } else {
    next();
  }
};
module.exports = checkComment;
