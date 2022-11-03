const express = require("express");
const authRouter = require("./authRouter");
const applicationRouter = require("./applicationRouter");
const gameRouter = require("./gameRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/applications", applicationRouter);
router.use("/games", gameRouter);

module.exports = router;
