const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
  });
};

exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) {
      return null;
    }

    return data;
  });
};

exports.hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

exports.checkPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

exports.getSecondsFromLifeTime = (lifeTimeStr) => {
  let timeValue = parseInt(lifeTimeStr.slice(0, -1));
  const timeChar = lifeTimeStr.slice(-1);

  switch (timeChar) {
    case "m":
      timeValue *= 60;
    case "h":
      timeValue *= 3600;
    case "d":
      timeValue *= 3600 * 24;
  }

  return timeValue;
};
