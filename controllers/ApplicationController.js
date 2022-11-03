const Application = require("../models/Application");
const Game = require("../models/Game");
const Board = require("../models/Board");

class ApplicationController {
  static async getAll(req, res) {
    try {
      const applications = await Application.find({active: true});

      res.json(applications);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async getPersonal(req, res) {
    try {
      const application = await Application.findOne({
        "creator.id": req.user.id,
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

      const board = await Board.findById(boardId);

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

      const application = await Application.create({
        actionTime,
        userCount,
        active: true,
        creator: {
          _id: user.id,
          nickname: user.nickname,
          rating: user.rating,
        },
        connectedUserIds: [user.id],
        board: {
          _id: board.id,
          name: board.name,
        },
      });

      return res
        .header({ Location: `/applications/${application.id}` })
        .sendStatus(201);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async attach(req, res) {
    const application = req.application;

    try {
      if (application.connectedUserIds.length >= application.userCount) {
        return res.sendStatus(404);
      }

      application.connectedUserIds.push(req.user.id);

      if (application.connectedUserIds.length === application.userCount) {
        const board = await Board.findById(application.board.id);

        if (!board) {
          return res.status(500).json({
            errors: [
              {
                msg: `Board ${application.board.id} not found`
              }
            ]
          })
        }

        await application.delete();

        await Game.create({
          actionTime: application.actionTime,
          userCount: application.userCount,
          userIds: application.connectedUserIds,
          board: board,
          states: [],
          actions: []
        })

        return res.sendStatus(200);
      }

      await application.save();

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async detach(req, res) {
    const application = req.application;

    const userApplicationIndex = application.connectedUserIds.findIndex((userId) => {
      return userId.toString() === req.user.id
    })

    if (userApplicationIndex === -1) {
      return res.sendStatus(403);
    }

    try {
      if (application.connectedUserIds.length === 1 && application.connectedUserIds[0].toString() === req.user.id) {
        await Application.deleteOne({
          id: req.params.applicationId,
        });

        return res.sendStatus(200);
      }

      application.connectedUserIds = application.connectedUserIds.filter((userId) => {
        return userId.toString() !== req.user.id
      })

      await application.save();

      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

module.exports = ApplicationController;
