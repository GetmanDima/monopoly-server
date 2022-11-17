const express = require("express")
const isAuthenticated = require("../middleware/isAuthenticated")
const handleValidationErrors = require("../middleware/handleValidationErrors")
const UserController = require("../controllers/UserController")
const getAuthenticatedUser = require("../middleware/getAuthenticatedUser")
const { body } = require("express-validator")
const uniqueNicknameValidator = require("../validation/validators/uniqueNicknameValidator")

const router = express.Router();

router.get(
  "/me",
  isAuthenticated,
  UserController.getProfile
);

router.patch(
  "/me",
  isAuthenticated,
  body("nickname").isString().isLength({ min: 3 }).custom(uniqueNicknameValidator),
  handleValidationErrors,
  getAuthenticatedUser,
  UserController.editProfile
);

router.patch(
  "/me/password",
  isAuthenticated,
  body("password").isString().isLength({ min: 3 }),
  handleValidationErrors,
  getAuthenticatedUser,
  UserController.changePassword
);

module.exports = router;
