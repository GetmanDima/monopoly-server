const { Schema, model, Types } = require("mongoose");

const Application = new Schema({
  actionTime: {
    type: Number,
    required: true,
  },
  userCount: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  creator: {
    type: {
      _id: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      nickname: String,
      rating: Number,
    },
  },
  board: {
    type: {
      _id: {
        type: Types.ObjectId,
        ref: "Board",
        required: true,
      },
      name: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("Application", Application);
