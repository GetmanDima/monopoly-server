const { Schema, model, Types } = require("mongoose");

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    unique: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  lastGameIds: [
    {
      type: Types.ObjectId,
      ref: "Game",
    },
  ],
  statistics: {
    gamesCount: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
    defeats: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = model("User", User);
