const AbstractManager = require("./AbstractManager");

class LabelManager extends AbstractManager {
  constructor() {
    super({ table: "label" });
  }

  findByRecipe(id) {
    return this.database.query(
      `SELECT label.name, label.id  FROM ${this.table} INNER JOIN recipe_label ON label.id = recipe_label.label_id WHERE recipe_label.recipe_id = ?;`,
      [id]
    );
  }
}

module.exports = LabelManager;
