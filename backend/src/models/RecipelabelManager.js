const AbstractManager = require("./AbstractManager");

class RecipeLabelManager extends AbstractManager {
  constructor() {
    super({ table: "recipe_label" });
  }

  insert(entrie) {
    return this.database.query(
      `insert into ${this.table} (recipe_id,label_id) values (?, ?)`,
      [entrie.recipe_id, entrie.label_id]
    );
  }

  findRecipeLabelEntrie(recipeId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE recipe_id = ?`,
      [recipeId]
    );
  }
}

module.exports = RecipeLabelManager;
