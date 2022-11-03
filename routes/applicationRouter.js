const express = require("express");
const { body, param } = require("express-validator");
const handleValidationErrors = require("../middleware/handleValidationErrors");
const isAuthenticated = require("../middleware/isAuthenticated");
const getAuthenticatedUser = require("../middleware/getAuthenticatedUser");
const applicationExists = require("../middleware/application/applicationExists")
const userHasNotApplication = require("../middleware/application/userHasNotApplication")
const userHasNotGame = require("../middleware/application/userHasNotGame")
const ApplicationController = require("../controllers/ApplicationController");

const router = express.Router();

router.use(isAuthenticated);

router.get(
  "/",
  ApplicationController.getAll
);

router.get(
  "/personal",
  ApplicationController.getPersonal
);

router.post(
  "/",
  body("actionTime").isInt({ min: 60, max: 180 }),
  body("userCount").isInt({ min: 2, max: 8 }),
  body("boardId").isString().isLength({ min: 24, max: 24 }),
  handleValidationErrors,
  userHasNotApplication,
  userHasNotGame,
  getAuthenticatedUser,
  ApplicationController.create
);

router.post(
  "/:applicationId/attach",
  param("applicationId").isString().isLength({ min: 24, max: 24 }),
  handleValidationErrors,
  applicationExists,
  userHasNotApplication,
  userHasNotGame,
  ApplicationController.attach
);

router.post(
  "/:applicationId/detach",
  param("applicationId").isString().isLength({ min: 24, max: 24 }),
  handleValidationErrors,
  applicationExists,
  ApplicationController.detach
);

module.exports = router;
