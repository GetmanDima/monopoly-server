const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthController {
  static async login() {}

  static async register(req, res) {
    try {
      const { email, password, nickname } = req.body;

      const candidateEmail = await User.findOne({ email });
      const candidateNickname = await User.findOne({ nickname });

      if (candidateEmail) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }

      if (candidateNickname) {
        return res
          .status(400)
          .json({ message: `User with nickname ${nickname} already exist` });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashPassword, nickname });

      await user.save();
      return res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

module.exports = AuthController;
