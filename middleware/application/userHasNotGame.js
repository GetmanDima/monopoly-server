const Game = require("../../models/Game");

module.exports = async (req, res, next) => {
  const game = await Game.findOne({
    userIds: {"$in" : [req.user.id]}
  })

  if (game) {
    return res.status(400).json({
      errors: [
        {
          msg: `User ${req.user.id} already attached to game`
        },
      ],
    })
  }

  next();
};
