const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "user_comment_recipe" });
  }

  findOne(userId, recipeId) {
    return this.database.query(
      `select * from  ${this.table} where user_id = ? AND recipe_id= ?`,
      [userId, recipeId]
    );
  }

  deleteOne(userId, recipeId) {
    return this.database.query(
      `delete from ${this.table} where user_id = ? AND recipe_id = ?`,
      [userId, recipeId]
    );
  }

  insert(comment) {
    return this.database.query(
      `insert into ${this.table} (content, rate, recipe_id, user_id) values (?, ?, ?, ?)`,
      [comment.newComment, comment.rate, comment.recipeId, comment.userId]
    );
  }

  update(comment) {
    return this.database.query(
      `UPDATE ${this.table} SET content = ?, rate = ? WHERE recipe_id = ? AND user_id = ?`,
      [comment.newComment, comment.rate, comment.recipeId, comment.userId]
    );
  }

  findByRecipeId(id) {
    return this.database.query(
      `SELECT ${this.table}.rate FROM ${this.table} WHERE recipe_id = ?`,
      [id]
    );
  }

  findAllByRecipeId(id) {
    return this.database.query(
      `SELECT user.pseudo, user.image, user_comment_recipe.content, user_comment_recipe.rate from user INNER JOIN user_comment_recipe on user_comment_recipe.user_id = user.id where user_comment_recipe.recipe_id = ?`,
      [id]
    );
  }

  findWithUserId(id) {
    return this.database.query(
      `select c.*, r.name from  ${this.table} c left join recipe r on r.id = c.recipe_id   where c.user_id = ? `,
      [id]
    );
  }

  findCountComment(recipeId) {
    return this.database.query(
      `SELECT c.*, r.user_id as userRecipeId from  ${this.table} c left join recipe r on r.id = c.recipe_id where c.recipe_id =?`,
      [recipeId]
    );
  }

  findAllByRecipeAndUser() {
    return this.database.query(
      `SELECT r.name AS recipe_name, u.pseudo AS user_pseudo, ucr.content, ucr.id
      FROM user_comment_recipe ucr
      JOIN recipe r ON ucr.recipe_id = r.id
      JOIN user u ON ucr.user_id = u.id order by ucr.creation_date;`
    );
  }
}

module.exports = CommentManager;
