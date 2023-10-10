const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "user_fav_recipe" });
  }

  findOne(userId, recipeId) {
    return this.database.query(
      `select is_fav from  ${this.table} where user_id = ? AND recipe_id= ?`,
      [userId, recipeId]
    );
  }

  deleteOne(userId, recipeId) {
    return this.database.query(
      `delete from ${this.table} where user_id = ? AND recipe_id= ?`,
      [userId, recipeId]
    );
  }

  insert(userId, recipeId) {
    return this.database.query(
      `insert into ${this.table} (is_fav, user_id, recipe_id) values (1, ?, ?)`,
      [userId, recipeId]
    );
  }
}

module.exports = FavoriteManager;
