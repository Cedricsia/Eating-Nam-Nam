// import some node modules for later

const fs = require("node:fs");
const path = require("node:path");

// create express app

const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

// use some application-level middlewares

app.use(cookieParser());
app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// import and mount the API routes
const authRouter = require("./routes/auth.routes");
const ingredientRouter = require("./routes/ingredient.routes");
const labelRouter = require("./routes/label.routes");
const recipeIngredientRouter = require("./routes/recipeIngredient.routes");
const recipeLabelRouter = require("./routes/recipeLabel.routes");
const recipesRouter = require("./routes/recipe.routes");
const userRouter = require("./routes/user.routes");
const commentRouter = require("./routes/comment.routes");
const favRouter = require("./routes/fav.routes");
const adminRouter = require("./routes/admin.routes");
const teamRouter = require("./routes/team.routes");
const badgeRouter = require("./routes/badge.routes");
const userBadgeRouter = require("./routes/userBadge.routes");

app.use(recipesRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use(ingredientRouter);
app.use(labelRouter);
app.use(recipeIngredientRouter);
app.use(recipeLabelRouter);
app.use(userRouter);
app.use(commentRouter);
app.use(teamRouter);
app.use(favRouter);
app.use(badgeRouter);
app.use(userBadgeRouter);

// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use(
  "/profilePicture",
  express.static(path.join(__dirname, "../public/uploads/profilePicture"))
);
// ready to export

module.exports = app;
