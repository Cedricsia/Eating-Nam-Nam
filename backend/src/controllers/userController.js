const models = require("../models");

const browse = (req, res) => {
  models.user
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
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] !== null) {
        res.send(rows[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  let user = {};

  user = JSON.parse(req.body.user);
  user.image = req.file.filename;

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
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

const editWithoutPicture = (req, res) => {
  const user = req.body;

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
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
  const user = req.body;

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
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

const editUserInformations = (req, res) => {
  const user = req.body;

  user.id = parseInt(req.params.id, 10);
  models.user
    .changeUserInformations(req.body)
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

const findNumberOfRecipeByUser = (req, res) => {
  models.user
    .getNumberOfRecipeCreateByUser()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const searchOne = (req, res) => {
  const search = req.query.name;

  models.user
    .findByName(search)
    .then(([users]) => {
      const userPromises = users.map(async (user) => {
        const row = await models.comment.findWithUserId(user.id);
        const [comments] = row;
        const userWithComments = { ...user, com: comments };
        return userWithComments;
      });
      return Promise.all([...userPromises]);
    })
    .then((userWithComment) => {
      res.json(userWithComment);
    })
    .catch((err) => {
      console.error(err);
    });
};
const searchAll = (req, res) => {
  models.user
    .findAllForSearch()
    .then(([users]) => {
      const userPromises = users.map(async (user) => {
        const row = await models.comment.findWithUserId(user.id);
        const [comments] = row;
        const row2 = await models.user_badge.findAllbadgeUser(user.id);
        const [allbadge] = row2;
        const userWithComments = { ...user, com: comments, badge: allbadge };
        return userWithComments;
      });
      return Promise.all([...userPromises]);
    })
    .then((userWithComment) => {
      res.json(userWithComment);
    })
    .catch((err) => {
      console.error(err);
    });
};

const editPassword = (req, res) => {
  const user = req.body;

  user.id = parseInt(req.params.id, 10);

  models.user
    .updatePassword(user)
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

const searchAllBadge = (req, res) => {
  const userId = req.body.user_id;
  models.user_badge
    .findAllbadgeUser(userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
    });
};
const searchAllBadgeParams = (req, res) => {
  const userId = parseInt(req.params.id, 10);

  models.user_badge
    .findAllbadgeUserParams(userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  editWithoutPicture,
  editUserInformations,
  searchOne,
  searchAll,
  findNumberOfRecipeByUser,
  editPassword,
  searchAllBadge,
  searchAllBadgeParams,
};
