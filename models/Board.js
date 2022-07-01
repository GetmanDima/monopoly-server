const { Schema, model, Types } = require("mongoose");

const Board = new Schema({
  name: {
    type: String,
    required: true,
  },
  fields: [{
    id: {
      type: Number,
      required: true,
      unique: true,
    },
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
      type: Number,
      unique: true,
    }],
    company: {
      type: {
        id: {
          type: Number,
          required: true,
          unique: true
        },
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
  actions: {
    type: [{
      id: {
        type: Number,
        required: true,
        unique: true
      },
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
        type: Number,
        unique: true,
      },
    }],
    required: false,
  },
});

module.exports = model("Board", Board);
