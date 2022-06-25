const { verifyToken } = require("../helpers");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];
    const data = verifyToken(accessToken);

    if (data && data.user) {
      req.user = data.user;
      next();
    } else {
      res.sendStatus(401);
    }
  }
};
