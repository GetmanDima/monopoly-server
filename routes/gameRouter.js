const express = require("express");
const {query} = require("express-validator");
const isAuthenticated = require("../middleware/isAuthenticated");
const handleValidationErrors = require("../middleware/handleValidationErrors")
const GameController = require("../controllers/GameController");
const dateTimeValidator = require("../validation/validators/dateTimeValidator");

const router = express.Router();

router.get(
  "/personal",
  query("dateFrom").custom(dateTimeValidator).optional(),
  handleValidationErrors,
  isAuthenticated,
  GameController.getPersonal
);

module.exports = router;
