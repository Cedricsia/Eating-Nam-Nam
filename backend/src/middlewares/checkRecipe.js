const recipeSchemas = require("../validators/recipeSchemas");
const models = require("../models");

const checkRecipe = async (req, res, next) => {
  let recipe = {};
  if (req.path.startsWith("/recipes/")) {
    const data = JSON.parse(req.body.data);
    recipe = data.recipe;
    const { error } = recipeSchemas.validate(recipe);

    if (error) {
      res.status(500).send(error.details[0].message);
    } else {
      next();
    }
  } else {
    recipe = JSON.parse(req.body.recipe);
    try {
      const [rows] = await models.recipe.findByName(recipe.name);
      if (rows.length === 0) {
        const { error } = recipeSchemas.validate(recipe);

        if (error) {
          res.status(500).send(error.details[0].message);
        } else {
          next();
        }
      } else {
        res.status(500).send("Le nom de la recette existe déjà.");
      }
    } catch (err) {
      res
        .status(500)
        .send(
          "Une erreur s'est produite lors de la vérification de la recette."
        );
    }
  }
};

module.exports = checkRecipe;
