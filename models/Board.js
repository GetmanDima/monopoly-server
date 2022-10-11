const { Schema, model, Types } = require("mongoose");

const Board = new Schema({
  name: {
    type: String,
    required: true,
  },
  fields: [{
    name: {
      type: String,
      required: true,
    },
    description: String,
    img: String,
    position: {
      type: Number,
      required: true,
    },
    actionIds: [{
      type: Types.ObjectId,
    }],
    company: {
      type: {
        name: {
          type: String,
          required: true,
        },
        description: String,
        logo: String,
        price: {
          type: Number,
          required: true,
        },
        tax: {
          type: Number,
          required: true,
        },
      },
      required: false,
    }
  }],
  actions: [{
    name: {
      type: String,
      required: true,
    },
    description: String,
    type: {
      type: String,
      required: true,
    },
    payload: {
      type: Object,
    },
    nextActionId: {
      type: Types.ObjectId
    },
  }],
});

module.exports = model("Board", Board);
