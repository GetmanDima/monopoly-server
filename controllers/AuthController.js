const {
  checkPassword,
  generateAccessToken,
  generateRefreshToken,
  getSecondsFromLifeTime,
  hashPassword,
} = require("../helpers");
const User = require("../models/User");

class AuthController {
  static async register(req, res) {
    try {
      const { email, password, nickname } = req.body;

      const candidate = await User.findOne({
        $or: [{ email }, { nickname }],
      });

      if (candidate) {
        if (email === candidate.email) {
          return res.status(400).json({
            errors: [
              {
                param: "email",
                location: "body",
                msg: `User with email ${email} already exist`,
              },
            ],
          });
        } else {
          return res.status(400).json({
            errors: [
              {
                param: "nickname",
                location: "body",
                msg: `User with nickname ${nickname} already exist`,
              },
            ],
          });
        }
      }

      const passwordHash = hashPassword(password);
      const user = new User({ email, password: passwordHash, nickname });

      await user.save();

      return res.header({ Location: `/users/${user._id}` }).sendStatus(201);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401);
      }

      if (!checkPassword(password, user.password)) {
        return res.status(401);
      }

      const payload = {
        user: {
          id: user.id,
          nickname: user.nickname,
        },
      };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        maxAge:
          1000 * getSecondsFromLifeTime(process.env.REFRESH_TOKEN_LIFETIME),
        sameSite: "lax",
      });

      res.json({ accessToken });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  static async refreshLogin(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;

      const user = await User.findOne({ refreshToken });

      if (!user) {
        return res.sendStatus(401);
      }

      const payload = {
        user: {
          id: user.id,
          nickname: user.nickname,
        },
      };

      const accessToken = generateAccessToken(payload);
      const newRefreshToken = generateRefreshToken(payload);

      user.refreshToken = newRefreshToken;
      await user.save();

      res.cookie("refreshToken", newRefreshToken, {
        path: "/",
        httpOnly: true,
        maxAge:
          1000 * getSecondsFromLifeTime(process.env.REFRESH_TOKEN_LIFETIME),
        sameSite: "lax",
      });

      res.json({ accessToken });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

module.exports = AuthController;
