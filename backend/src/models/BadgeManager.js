const AbstractManager = require("./AbstractManager");

class BadgeManager extends AbstractManager {
  constructor() {
    super({ table: "badge" });
  }
}
module.exports = BadgeManager;
