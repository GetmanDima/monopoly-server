const express = require("express");
const authRouter = require("./authRouter");
const applicationRouter = require("./applicationRouter");
const gameRouter = require("./gameRouter");
const userRouter = require("./userRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/applications", applicationRouter);
router.use("/games", gameRouter);
router.use("/users", userRouter);

module.exports = router;
