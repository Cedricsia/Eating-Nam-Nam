const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  insert(recipe) {
    const stepsJSON = JSON.stringify(recipe.steps);
    const nutritionJSON = JSON.stringify(recipe.nutrition);
    return this.database.query(
      `insert into ${this.table} (name, steps, difficulty, cooking_time, time, nutrition, initial_portion,image, user_id) values (?, ?, ?, ?, ?, ?, ?,?, ?)`,
      [
        recipe.name,
        stepsJSON,
        recipe.difficulty,
        recipe.cooking_time,
        recipe.time,
        nutritionJSON,
        recipe.initial_portion,
        recipe.image,
        recipe.user_id,
      ]
    );
  }

  update(recipe) {
    const stepsJSON = JSON.stringify(recipe.steps);
    const nutritionJSON = JSON.stringify(recipe.nutrition);
    return this.database.query(
      `update ${this.table} set name = ? , steps= ? , difficulty = ?, cooking_time = ? , time = ? , nutrition = ? , initial_portion =?, image= ?, user_id = ?  where id = ?`,
      [
        recipe.name,
        stepsJSON,
        recipe.difficulty,
        recipe.cooking_time,
        recipe.time,
        nutritionJSON,
        recipe.initial_portion,
        recipe.image,
        recipe.user_id,
        recipe.id,
      ]
    );
  }

  getRecipeLabel() {
    return this.database.query(
      `select recipe.id, recipe.name, time, recipe.image, GROUP_CONCAT(recipe_label.label_id) AS labelId, GROUP_CONCAT(label.name) AS labelName, user.image AS user_img, user.pseudo AS user_pseudo FROM recipe JOIN recipe_label ON recipe.id = recipe_label.recipe_id JOIN label ON recipe_label.label_id = label.id JOIN user ON recipe.user_id = user.id GROUP BY recipe.id`
    );
  }

  getFavouriteLabel(userId) {
    return this.database.query(
      `select recipe.id, recipe.name, time, recipe.image AS image, labelId, labelName, user.image AS user_img, user_fav_recipe.recipe_id AS fav_recipe, user_fav_recipe.user_id  FROM recipe 
      JOIN ( SELECT recipe_id, GROUP_CONCAT(label_id) AS labelId FROM recipe_label GROUP BY recipe_id ) AS recipe_label_agg ON recipe.id = recipe_label_agg.recipe_id JOIN ( SELECT recipe_id, GROUP_CONCAT(name) AS labelName FROM recipe_label JOIN label ON recipe_label.label_id = label.id GROUP BY recipe_id ) AS label_agg ON recipe.id = label_agg.recipe_id JOIN user ON recipe.user_id = user.id JOIN user_fav_recipe ON recipe.id = user_fav_recipe.recipe_id WHERE user_fav_recipe.user_id = ? GROUP BY recipe.id`,
      [userId]
    );
  }

  findByName(name) {
    return this.database.query(`select * from  ${this.table} where name = ?`, [
      name,
    ]);
  }

  findRecipeByUser(userId) {
    return this.database.query(
      `SELECT ${this.table}.*, user.image AS user_img FROM ${this.table} JOIN user ON ${this.table}.user_id = user.id WHERE ${this.table}.user_id = ?`,
      [userId]
    );
  }

  findLastFour() {
    return this.database.query(
      "SELECT recipe.id, recipe.image, recipe.name, recipe.time, user.image AS user_img FROM recipe JOIN user ON user.id=recipe.user_id ORDER BY recipe.creation_date DESC LIMIT 4"
    );
  }

  findTheMostPopular() {
    return this.database.query(
      "SELECT recipe.id, recipe.name, recipe.image, AVG(user_comment_recipe.rate), COUNT(user_comment_recipe.rate), user.pseudo FROM recipe JOIN user ON recipe.user_id = user.id LEFT JOIN user_comment_recipe ON recipe.id = user_comment_recipe.recipe_id GROUP BY recipe.id, recipe.name, recipe.image, user.pseudo HAVING AVG(user_comment_recipe.rate) >= 4 AND COUNT(user_comment_recipe.rate) >= 4 ORDER BY RAND() LIMIT 1;"
    );
  }

  findRecipeHeader(id) {
    return this.database.query(
      `SELECT ${this.table}.image, ${this.table}.name, user.pseudo, ${this.table}.time, ${this.table}.cooking_time, ${this.table}.difficulty FROM ${this.table} LEFT JOIN user ON user.id=${this.table}.user_id WHERE ${this.table}.id = ?`,
      [id]
    );
  }

  findSteps(id) {
    return this.database.query(`SELECT steps FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  findNutrition(id) {
    return this.database.query(
      `SELECT nutrition FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  findInitialPortion(id) {
    return this.database.query(
      `SELECT initial_portion FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  findRecipeCount(id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  findRecipeCount2(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [id]
    );
  }

  deleteFromIngredientId(id) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE id IN (SELECT recipe_id FROM recipe_ing WHERE ingredient_id = ?)`,
      [id]
    );
  }
}
module.exports = RecipeManager;
