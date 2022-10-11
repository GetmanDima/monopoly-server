const { Schema, model, Types} = require("mongoose");

const Game = new Schema({
  actionTime: {
    type: Number,
    required: true,
  },
  userCount: {
    type: Number,
    required: true,
  },
  userIds: [{
    type: Types.ObjectId,
    ref: "User",
    required: true,
  }],
  result: Number,
  board: {
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
  },
  states: [{
    users: [{
      userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
      money: {
        type: Number,
        required: true,
      },
      position: {
        type: Number,
        required: true,
      },
      nextActionId: {
        type: Types.ObjectId,
      },
      companyIds: [{
        type: Types.ObjectId,
      }]
    }],
    moveNumber: {
      type: Number,
      required: true,
    },
    nextMoveUserId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  actions: [{
    number: {
      type: Number,
      required: true,
    },
    actionId: {
      type: Types.ObjectId,
    },
    description: String,
    payload: Object,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("Game", Game);
