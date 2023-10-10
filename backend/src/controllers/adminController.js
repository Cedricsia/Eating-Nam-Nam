const models = require("../models");

const browse = (req, res) => {
  res.sendStatus(201);
};

const edit = (req, res) => {
  const { recipe, ingredients, labels } = JSON.parse(req.body.data);

  if (Object.keys(req).includes("file")) {
    recipe.image = req.file.filename;
  }
  let oldRecipeing = [];
  let oldRecipelabel = [];
  const promises = [];
  models.recipe_ingredient
    .findEntriesFromRecipeId(recipe.id)
    .then(([oldRecipeIngRows]) => {
      if (oldRecipeIngRows && oldRecipeIngRows.length > 0) {
        oldRecipeing = oldRecipeIngRows;
      }
      return models.recipe_ingredient.findRecipeIngredientEntrie(recipe.id);
    })
    .then(([ingredientExisting]) => {
      ingredients.forEach((actualIng) => {
        const ingredientExists = ingredientExisting.some(
          (elem) => actualIng.ingredient_id === elem.ingredient_id
        );

        if (ingredientExists) {
          promises.push(models.recipe_ingredient.update(actualIng));
        } else {
          promises.push(models.recipe_ingredient.insert(actualIng));
        }
      });

      oldRecipeing.forEach((oldIngredient) => {
        const ingredientExists = ingredients.some(
          (elem) => oldIngredient.ingredient_id === elem.ingredient_id
        );

        if (!ingredientExists) {
          promises.push(models.recipe_ingredient.delete(oldIngredient.id));
        }
      });

      return models.recipe_label.findRecipeLabelEntrie(recipe.id);
    })
    .then(([oldRecipeLabelRows]) => {
      if (oldRecipeLabelRows && oldRecipeLabelRows.length > 0) {
        oldRecipelabel = oldRecipeLabelRows;
      }

      return models.recipe_label.findRecipeLabelEntrie(recipe.id);
    })
    .then(([labelExisting]) => {
      labels.forEach((actualLabel) => {
        const labelExists = labelExisting.some(
          (elem) => actualLabel.label_id === elem.label_id
        );

        if (!labelExists) {
          promises.push(models.recipe_label.insert(actualLabel));
        }
      });

      oldRecipelabel.forEach((oldlabel) => {
        const labelExists = labels.some(
          (elem) => oldlabel.label_id === elem.label_id
        );

        if (!labelExists) {
          promises.push(models.recipe_label.delete(oldlabel.id));
        }
      });
      return Promise.all(promises);
    })
    .then(() => {
      return models.recipe.update(recipe);
    })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = { browse, edit };
