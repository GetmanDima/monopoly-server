const User = require("../models/User");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.user.id, {
    password: 0,
    refreshToken: 0,
  });

  if (!user) {
    return res.sendStatus(401);
  }

  req.User = user;
  next();
};
