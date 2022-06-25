const Application = require("../models/Application");
const Board = require("../models/Board");

class ApplicationController {
  static async getOne(req, res) {
    try {
      const application = await Application.findById(req.params.applicationId);

      if (!application) {
        return res.sendStatus(404);
      }

      if (req.user.id !== application.creator._id.toString()) {
        return res.sendStatus(403);
      }

      res.json(application);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async getPersonal(req, res) {
    try {
      const application = await Application.findOne({
        "creator._id": req.user.id,
      });

      res.json(application);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async create(req, res) {
    try {
      const user = req.User;
      const { actionTime, userCount, boardId } = req.body;

      const board = await Board.findById(boardId, { _id: 1, name: 1 });

      if (!board) {
        return res.status(400).json({
          errors: [
            {
              param: "boardId",
              location: "body",
              msg: `Board with id ${boardId} not found`,
            },
          ],
        });
      }

      await Application.deleteMany({ "creator._id": req.User._id });

      const application = await Application.create({
        actionTime,
        userCount,
        active: true,
        creator: {
          _id: user._id,
          nickname: user.nickname,
          rating: user.rating,
        },
        board: {
          _id: board._id,
          name: board.name,
        },
      });

      return res
        .header({ Location: `/applications/${application._id}` })
        .sendStatus(201);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async delete(req, res) {
    try {
      await Application.deleteOne({
        _id: req.params.applicationId,
        "creator._id": req.user.id,
      });

      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

module.exports = ApplicationController;
