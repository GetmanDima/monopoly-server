const express = require("express");
const authRouter = require("./authRouter");
const applicationRouter = require("./applicationRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/applications", applicationRouter);

module.exports = router;
