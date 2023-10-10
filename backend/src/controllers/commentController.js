const models = require("../models");

const browse = (req, res) => {
  models.comment
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByRecipeId = (req, res) => {
  models.comment
    .findAllByRecipeId(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { userId } = req.params;
  const { recipeId } = req.params;

  models.comment
    .findOne(userId, recipeId)
    .then(([rows]) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const comment = req.body;

  models.comment
    .update(comment)
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

const add = (req, res) => {
  const comment = req.body;

  // ! Vérifier le res.location !
  models.comment
    .insert(comment)
    .then(([result]) => {
      res.location(`/comments/${result.recipe_id}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { userId, recipeId } = req.params;
  models.comment
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

const destroyComment = (req, res) => {
  models.comment
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

const getAverageRating = (req, res) => {
  models.comment
    .findByRecipeId(req.params.id)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.json({ average: 0 });
      } else {
        const sum = rows.reduce((total, row) => total + row.rate, 0);
        const average = Math.round(sum / rows.length);
        res.json({ average });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findCommentAndRateByRecipeId = (req, res) => {
  models.comment
    .findAllByRecipeId(req.params.id)
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

const findAllCommentsByUserAndRecipe = (req, res) => {
  models.comment
    .findAllByRecipeAndUser()
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

module.exports = {
  browse,
  browseByRecipeId,
  read,
  edit,
  add,
  destroy,
  getAverageRating,
  findCommentAndRateByRecipeId,
  findAllCommentsByUserAndRecipe,
  destroyComment,
};
