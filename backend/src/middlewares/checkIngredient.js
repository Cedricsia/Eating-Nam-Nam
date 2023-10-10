const ingredientSchemas = require("../validators/ingredientSchemas");

const checkIndredient = (req, res, next) => {
  const { error } = ingredientSchemas.validate(req.body);

  if (error) {
    res.status(500).send(error.details[0].message);
  } else {
    next();
  }
};
module.exports = checkIndredient;
