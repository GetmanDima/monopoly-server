const express = require("express");
const { body, cookie } = require("express-validator");
const handleValidationErrors = require("../middleware/handleValidationErrors");
const { nameRules } = require("../validation/register");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),
  handleValidationErrors,
  AuthController.login
);

router.post(
  "/login/refresh",
  cookie("refreshToken").isString().notEmpty(),
  handleValidationErrors,
  AuthController.refreshLogin
);

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isString().isLength({ min: 3 }),
  body("nickname").isString().isLength({ min: 3 }),
  ...nameRules,
  handleValidationErrors,
  AuthController.register
);

module.exports = router;
