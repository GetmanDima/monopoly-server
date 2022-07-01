const { Schema, model } = require("mongoose");

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
    _id: {
      type: Types.ObjectId,
      ref: "Board",
      required: true,
    },
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
  },
  states: {
    type: [{
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
          type: Number,
          unique: true,
        },
        companyIds: [{
          type: Number,
          unique: true,
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
        default: Date.now()
      }
    }],
    required: false,
  },
  actions: [{
    number: {
      type: Number,
      required: true,
      unique: true
    },
    actionId: {
      type: Number,
      required: true,
    },
    description: String,
    payload: Object,
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }]
});

module.exports = model("Game", Game);
