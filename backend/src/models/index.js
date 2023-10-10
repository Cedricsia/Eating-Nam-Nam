require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const RecipeManager = require("./RecipeManager");
const IngredientManager = require("./IngredientManager");
const LabelManager = require("./LabelManager");
const RecipeLabelManager = require("./RecipelabelManager");
const RecipeIngredientManager = require("./RecipeIngredientManager");
const CommentManager = require("./CommentManager");
const FavoriteManager = require("./FavoriteManager");
const UserManager = require("./UserManager");
const TeamManager = require("./TeamManager");
const AdminManager = require("./AdminManager");
const BadgeManager = require("./BadgeManager");
const UserBadgeManager = require("./UserBadgeManager");

models.team = new TeamManager();
models.team.setDatabase(pool);
models.recipe = new RecipeManager();
models.comment = new CommentManager();
models.recipe.setDatabase(pool);
models.ingredient = new IngredientManager();
models.ingredient.setDatabase(pool);
models.label = new LabelManager();
models.label.setDatabase(pool);
models.recipe_label = new RecipeLabelManager();
models.recipe_label.setDatabase(pool);
models.recipe_ingredient = new RecipeIngredientManager();
models.recipe_ingredient.setDatabase(pool);
models.user = new UserManager();
models.user.setDatabase(pool);
models.comment.setDatabase(pool);
models.ingredient = new IngredientManager();
models.ingredient.setDatabase(pool);
models.fav = new FavoriteManager();
models.fav.setDatabase(pool);
models.admin = new AdminManager();
models.admin.setDatabase(pool);
models.badge = new BadgeManager();
models.badge.setDatabase(pool);
models.user_badge = new UserBadgeManager();
models.user_badge.setDatabase(pool);

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
