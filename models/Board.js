const { Schema, model, Types } = require("mongoose");

const Board = new Schema({
  name: String,
});

module.exports = model("Board", Board);
