const models = require("../models");

const readByRecipeIdAndUserId = (req, res) => {
  const { userId } = req.params;
  const { recipeId } = req.params;

  models.fav
    .findOne(userId, recipeId)
    .then(([rows]) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const { userId } = req.params;
  const { recipeId } = req.params;

  models.fav
    .insert(userId, recipeId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.location(`/favorite/${recipeId}/${userId}`).sendStatus(201);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { userId } = req.params;
  const { recipeId } = req.params;

  models.fav
    .deleteOne(userId, recipeId)
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

module.exports = {
  readByRecipeIdAndUserId,
  add,
  destroy,
};
