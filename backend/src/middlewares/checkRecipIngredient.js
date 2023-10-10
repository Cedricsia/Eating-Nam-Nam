const models = require("../models");

const checkRecipeIngredient = async (req, res, next) => {
  let ingredients = {};
  if (req.path.startsWith("/recipes/")) {
    const data = JSON.parse(req.body.data);
    ingredients = data.ingredients;
  } else {
    ingredients = JSON.parse(req.body.ingredients);
  }
  try {
    const ingredientPromises = ingredients.map(async (ingredient) => {
      const [rows] = await models.ingredient.find(ingredient.ingredient_id);

      if (rows.length === 0) {
        throw new Error("Ingredient not found");
      }
    });

    await Promise.all(ingredientPromises);

    next();
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Ingredient not found" });
  }
};

module.exports = checkRecipeIngredient;
