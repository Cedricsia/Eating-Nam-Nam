const models = require("../models");

const browse = (req, res) => {
  models.ingredient
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
  models.ingredient
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
  const ingredient = req.body;

  ingredient.id = parseInt(req.params.id, 10);

  models.ingredient
    .update(ingredient)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err, "l'erreur vient du controller");
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const ingredient = req.body;

  models.ingredient
    .insert(ingredient)
    .then(([result]) => {
      res.location(`/ingredients/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.recipe
    .deleteFromIngredientId(req.params.id)
    .then(() => {
      return models.ingredient.delete(req.params.id);
    })
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
  models.ingredient
    .findByName(ing)
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

const readLastTwentyIng = (req, res) => {
  models.ingredient
    .getLastTwentyIng()
    .then(([rows]) => {
      res.send(rows);
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
  readLastTwentyIng,
};
