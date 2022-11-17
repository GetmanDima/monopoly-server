const User = require("../models/User")
const { hashPassword } = require("../helpers")

class UserController {
  static async getProfile(req, res) {
    try {
      const profile = await User.findById(req.user.id, {
        password: 0,
        refreshToken: 0,
      })

      res.json(profile)
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  }

  static async editProfile(req, res) {
    try {
      const { nickname } = req.body
      req.User.nickname = nickname
      await req.User.save()
      res.sendStatus(200)
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  }

  static async changePassword(req, res) {
    try {
      const { password } = req.body
      req.User.password = hashPassword(password)
      await req.User.save()
      res.sendStatus(200)
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  }
}

module.exports = UserController