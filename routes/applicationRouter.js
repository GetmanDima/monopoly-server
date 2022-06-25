const express = require("express");
const { body, param } = require("express-validator");
const handleValidationErrors = require("../middleware/handleValidationErrors");
const isAuthenticated = require("../middleware/isAuthenticated");
const getAuthenticatedUser = require("../middleware/getAuthenticatedUser");
const ApplicationController = require("../controllers/ApplicationController");

const router = express.Router();

router.get("/personal", isAuthenticated, ApplicationController.getPersonal);

router.get(
  "/:applicationId",
  param("applicationId").isString().isLength({ min: 24, max: 24 }),
  handleValidationErrors,
  isAuthenticated,
  ApplicationController.getOne
);

router.post(
  "/",
  body("actionTime").isInt({ min: 60, max: 180 }),
  body("userCount").isInt({ min: 2, max: 8 }),
  body("boardId").isString().isLength({ min: 24, max: 24 }),
  handleValidationErrors,
  isAuthenticated,
  getAuthenticatedUser,
  ApplicationController.create
);

router.delete(
  "/:applicationId",
  param("applicationId").isString().isLength({ min: 24, max: 24 }),
  handleValidationErrors,
  isAuthenticated,
  ApplicationController.delete
);

module.exports = router;
