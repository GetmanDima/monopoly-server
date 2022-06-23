const express = require("express");
const { body } = require("express-validator");
const checkValidationErrors = require("../middleware/handleValidationErrors");
const { nameRules } = require("../validation/register");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),
  checkValidationErrors,
  AuthController.login
);

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isString().isLength({ min: 3 }),
  body("nickname").isString().isLength({ min: 3 }),
  ...nameRules,
  checkValidationErrors,
  AuthController.register
);

module.exports = router;
