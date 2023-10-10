const AbstractManager = require("./AbstractManager");

class UserBadgemanager extends AbstractManager {
  constructor() {
    super({ table: "user_badge" });
  }

  insert(entrie) {
    return this.database.query(
      `insert into ${this.table} (user_id, badge_id) values (?, ?)`,
      [entrie.user_id, entrie.badge_id]
    );
  }

  findExistingBadge(badgeid) {
    return this.database.query(
      `select * from ${this.table} where badge_id =?`,
      [badgeid]
    );
  }

  findAllbadgeUser(userId) {
    return this.database.query(
      `select u.* ,b.* from ${this.table} u left join badge b on b.id = u.badge_id  where user_id =?`,
      [userId]
    );
  }

  findAllbadgeUserParams(userId) {
    return this.database.query(
      `select b.* ,u.* from ${this.table} u left join badge b on b.id = u.badge_id  where u.user_id =?`,
      [userId]
    );
  }
}
module.exports = UserBadgemanager;
