const Application = require("../../models/Application");

module.exports = async (req, res, next) => {
  const application = await Application.findOne({
    connectedUserIds: {"$in" : [req.user.id]}
  })

  if (application) {
    return res.status(400).json({
      errors: [
        {
          msg: `User ${req.user.id} already attached to application`
        },
      ],
    })
  }

  next();
};
