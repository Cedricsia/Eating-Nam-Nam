const models = require("../models");

const browse = (req, res) => {
  models.user_badge
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
  const { userId } = req.params;
  const { recipeId } = req.params;

  models.user_badge
    .findOne(userId, recipeId)
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
  const userBadge = req.body;

  models.user_badge
    .update(userBadge)
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
  const userBadge = req.body;

  // ! Vérifier le res.location !
  models.user_badge
    .insert(userBadge)
    .then(([result]) => {
      res.location(`/user_badges/${result.recipe_id}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  // ! manque user_id
  models.user_badge
    .deleteOne(req.params.id)
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
  browse,

  read,
  edit,
  add,
  destroy,
};
