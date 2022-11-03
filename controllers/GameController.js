const Game = require("../models/Game");

class GameController {
  static async getPersonal(req, res) {
    try {
      const where = {
        userIds: {"$in" : [req.user.id]}
      }

      if (req.query.dateFrom) {
        where.createdAt = {
          "$gte": Date.parse(req.query.dateFrom)
        }
      }

      const game = await Game.findOne(where);

      res.json(game);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

module.exports = GameController;
