const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes");

dotenv.config();

const PORT = process.env.PORT ?? 80;
const URL = process.env.URL ?? "http://127.0.0.1";
const NODE_ENV = process.env.NODE_ENV ?? "development";
const DB_URL =
  NODE_ENV === "development" ? process.env.DEV_DB_URL : process.env.PROD_DB_URL;

const app = express();

const allowCorsList = require("./config/cors.js")[NODE_ENV];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  if (
    allowCorsList.includes("*") ||
    allowCorsList.indexOf(req.header("Origin")) !== -1
  ) {
    corsOptions = { origin: true, credentials: true };
  } else {
    corsOptions = { origin: false };
  }

  callback(null, corsOptions);
};

app.use(cookieParser("secret key"));
app.use(cors(corsOptionsDelegate));
app.use(bodyParser.json());
app.use("/api", mainRouter);

const start = async () => {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(PORT, () => {
    console.log(`Server started at ${URL}:${PORT}`);
  });
};

start();
