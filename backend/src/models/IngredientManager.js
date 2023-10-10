const AbstractManager = require("./AbstractManager");

class IngredientManager extends AbstractManager {
  constructor() {
    super({ table: "ingredient" });
  }

  findByName(name) {
    return this.database.query(
      `select * from ${this.table} where name like  ?`,
      [`${name}%`]
    );
  }

  insert(ingredient) {
    return this.database.query(
      `insert into ${this.table} (name, proteins, fat, sugar, fiber, energy, unit) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        ingredient.name,
        ingredient.proteins,
        ingredient.fat,
        ingredient.sugar,
        ingredient.fiber,
        ingredient.energy,
        ingredient.unit,
      ]
    );
  }

  update(ingredient) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, proteins = ?, fat = ?, sugar = ?, fiber = ?, energy = ?, unit = ? WHERE id = ?`,
      [
        ingredient.name,
        ingredient.proteins,
        ingredient.fat,
        ingredient.sugar,
        ingredient.fiber,
        ingredient.energy,
        ingredient.unit,
        ingredient.id,
      ]
    );
  }

  getLastTwentyIng() {
    return this.database.query(
      `SELECT * from ${this.table} ORDER BY id DESC LIMIT 20`
    );
  }
}

module.exports = IngredientManager;
