const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} ( password, pseudo, mail, firstname, lastname) values (?,?,?,?,?)`,
      [
        user.password,
        user.pseudo,
        user.creationMail,
        user.firstname,
        user.lastname,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set gender = ? , socio = ? , pseudo = ? , age = ? , mail = ? , firstname =?, lastname =?,image =?  where id = ?`,
      [
        user.gender,
        user.socio,
        user.pseudo,
        user.age,
        user.mail,
        user.firstname,
        user.lastname,
        user.image,
        user.id,
      ]
    );
  }

  findOneByEmail(mail) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE mail = ?`, [
      mail,
    ]);
  }

  changeUserInformations(user) {
    return this.database.query(
      `UPDATE ${this.table} SET
      gender = ?,
      socio = ?,
      pseudo = ?,
      age = ?,
      mail = ?,
      firstname = ?,
      lastname = ?,
      image = ?,
      role = ?
  WHERE
      id = ?;`,
      [
        user.gender,
        user.socio,
        user.pseudo,
        user.age,
        user.mail,
        user.firstname,
        user.lastname,
        user.image,
        user.role,
        user.id,
      ]
    );
  }

  findByName(name) {
    return this.database.query(
      `SELECT u.pseudo,u.id,u.creation_date,u.image,COUNT(r.user_id) recipes FROM user u LEFT JOIN recipe r ON u.id = r.user_id WHERE u.pseudo LIKE ? GROUP BY u.id, u.pseudo, u.creation_date, u.image;`,
      [`%${name}%`]
    );
  }

  findAllForSearch() {
    return this.database.query(
      `SELECT u.pseudo,u.id,u.creation_date,u.image,COUNT(r.user_id) recipes FROM user u LEFT JOIN recipe r ON u.id = r.user_id  GROUP BY u.id, u.pseudo, u.creation_date, u.image;`
    );
  }

  getNumberOfRecipeCreateByUser() {
    return this.database.query(
      `SELECT ${this.table}.id AS user_id, ${this.table}.pseudo, ${this.table}.firstname, ${this.table}.lastname, ${this.table}.gender, ${this.table}.socio, ${this.table}.image, ${this.table}.role, ${this.table}.age, ${this.table}.mail, COUNT(recipe.id) AS nb_recipe FROM ${this.table} LEFT JOIN recipe ON ${this.table}.id = recipe.user_id GROUP BY ${this.table}.id`
    );
  }

  findHashedPassword(id) {
    return this.database.query(
      `SELECT password FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  updatePassword(user) {
    return this.database.query(
      `update ${this.table} set password = ? where id = ?`,
      [user.password, user.id]
    );
  }
}

module.exports = UserManager;
