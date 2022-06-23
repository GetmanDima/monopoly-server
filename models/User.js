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
  rating: {
    type: Number,
    default: 0,
  },
  games: [
    {
      type: Types.ObjectId,
      ref: "Game",
    },
  ],
  currentGame: {
    type: Types.ObjectId,
    ref: "Game",
  },
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
  application: {
    type: {
      moveTime: {
        type: Number,
        required: true,
      },
      active: {
        type: Boolean,
        required: true,
      },
      userCount: {
        type: Number,
        required: true,
      },
      board: {
        type: {
          _id: Types.ObjectId,
          name: String,
        },
        required: true,
      },
    },
    required: false,
  },
});

module.exports = model("User", User);
