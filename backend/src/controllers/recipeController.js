const models = require("../models");

const browse = (req, res) => {
  models.recipe
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.recipe
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readFavouriteRecipe = (req, res) => {
  models.recipe
    .getFavouriteLabel(parseInt(req.params.user_id, 10))
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
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

const add = (req, res) => {
  let recipeId = 0;
  const recipe = JSON.parse(req.body.recipe);
  const ingredients = JSON.parse(req.body.ingredients);
  const labels = JSON.parse(req.body.labels);
  recipe.image = req.file.filename;

  models.recipe
    .insert(recipe)
    .then(([result]) => {
      recipeId = result.insertId;
      return models.recipe.find(recipeId);
    })
    .then(([rows]) => {
      recipeId = rows[0].id;
      const ingredientPromises = ingredients.map((elem) => {
        return models.recipe_ingredient.insert({
          ...elem,
          recipe_id: recipeId,
        });
      });

      const labelPromises = labels.map((elem) => {
        return models.recipe_label.insert({ ...elem, recipe_id: recipeId });
      });

      return Promise.all([...ingredientPromises, ...labelPromises]);
    })
    .then(() => {
      res.location(`/recipes/${recipeId}`).status(201).send({ id: recipeId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.recipe
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getLabel = (req, res) => {
  models.recipe
    .getRecipeLabel()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readLastFourRecipes = (req, res) => {
  models.recipe
    .findLastFour()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readMostPopularRecipes = (req, res) => {
  models.recipe
    .findTheMostPopular()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readInitialPortion = (req, res) => {
  models.recipe
    .findInitialPortion(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readRecipeHeader = (req, res) => {
  models.recipe
    .findRecipeHeader(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readSteps = (req, res) => {
  models.recipe
    .findSteps(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getByUser = (req, res) => {
  const userId = req.params.user_id;
  models.recipe
    .findRecipeByUser(userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readNutrition = (req, res) => {
  models.recipe
    .findNutrition(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getAllFromRecipe = (req, res) => {
  const id = parseInt(req.params.id, 10);

  let result = {};

  Promise.all([
    models.recipe.find(id),
    models.label.findByRecipe(id),
    models.recipe_ingredient.findByRecipeAllId(id),
  ])
    .then(([recipeRows, labelRows, ingredientRows]) => {
      if (!recipeRows[0]) {
        res.sendStatus(404);
        return;
      }

      result = {
        ...result,
        recipe: recipeRows[0][0],
        labels: labelRows[0],
        ingredients: ingredientRows[0],
      };

      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  readFavouriteRecipe,
  edit,
  add,
  destroy,
  getLabel,
  readLastFourRecipes,
  readMostPopularRecipes,
  readInitialPortion,
  readRecipeHeader,
  readNutrition,
  readSteps,
  getByUser,
  getAllFromRecipe,
};
