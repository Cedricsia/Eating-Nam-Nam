const AbstractManager = require("./AbstractManager");

class RecipeIngredient extends AbstractManager {
  constructor() {
    super({ table: "recipe_ing" });
  }

  insert(entrie) {
    return this.database.query(
      `insert into ${this.table} (quantity, recipe_id,ingredient_id) values (?, ?, ?)`,
      [entrie.quantity, entrie.recipe_id, entrie.ingredient_id]
    );
  }

  findByRecipeId(id) {
    return this.database.query(
      `SELECT ingredient.name, ingredient.unit, ${this.table}.quantity FROM ${this.table} INNER JOIN ingredient ON ${this.table}.ingredient_id = ingredient.id WHERE ${this.table}.recipe_id = ? `,
      [id]
    );
  }

  findByRecipeAllId(id) {
    return this.database.query(
      `SELECT ingredient.name, ingredient.proteins, ingredient.fat, ingredient.sugar, ingredient.fiber, ingredient.energy,ingredient.id ,ingredient.unit, ${this.table}.quantity ,${this.table}.recipe_id FROM ${this.table} INNER JOIN ingredient ON ${this.table}.ingredient_id = ingredient.id WHERE ${this.table}.recipe_id = ? `,
      [id]
    );
  }

  findRecipeIngredientEntrie(recipeId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE recipe_id = ?`,
      [recipeId]
    );
  }

  update(entrie) {
    return this.database.query(
      `UPDATE ${this.table} SET quantity = ?, recipe_id = ?, ingredient_id = ? WHERE recipe_id = ? AND ingredient_id = ?`,
      [
        entrie.quantity,
        entrie.recipe_id,
        entrie.ingredient_id,
        entrie.recipe_id,
        entrie.ingredient_id,
      ]
    );
  }

  findEntriesFromRecipeId(id) {
    return this.database.query(
      `SELECT *  FROM ${this.table}  WHERE ${this.table}.recipe_id = ? `,
      [id]
    );
  }

  findRecipeByIngredient(id) {
    return this.database.query(
      `SELECT recipe_id FROM ${this.table} WHERE ingredient_id = ?`,
      [id]
    );
  }
}

module.exports = RecipeIngredient;
