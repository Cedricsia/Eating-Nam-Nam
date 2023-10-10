const models = require("../models");

const browse = (req, res) => {
  models.recipe_label
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
  models.recipe_label
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

const edit = (req, res) => {
  const recipeLabel = req.body;

  recipeLabel.id = parseInt(req.params.id, 10);

  models.recipe_label
    .update(recipeLabel)
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
  const recipeLabel = req.body;

  models.recipe_label
    .insert(recipeLabel)
    .then(([result]) => {
      res.location(`/recipe_labels/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.recipe_label
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
const searchOne = (req, res) => {
  const ing = req.query.name;
  models.recipe_label
    .findByName(ing)
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
};
const browseByrecipeId = (req, res) => {
  models.recipe_label
    .findRecipeLabelEntrie(req.params.id)
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
  read,
  edit,
  add,
  destroy,
  searchOne,
  browseByrecipeId,
};
