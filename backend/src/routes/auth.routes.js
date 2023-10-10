const express = require("express");

const CheckUserDoesntExist = require("../middlewares/checkUserDoesntExist");
const CheckUserExists = require("../middlewares/checkUserExists");
const checkUser = require("../validators/userValidator");
const { signIn, signUp, logOut } = require("../controllers/authController");
const hashPassword = require("../middlewares/hashPassword");
const checkLogin = require("../validators/loginValidator");
const checkAdmin = require("../middlewares/checkAdminExist");

const router = express.Router();

router.post("/sign-in", checkLogin, CheckUserExists, signIn);
router.post("/sign-up", checkUser, CheckUserDoesntExist, hashPassword, signUp);
router.get("/logout", logOut);
router.post("/sign-in/admin", checkAdmin, signIn);

module.exports = router;
