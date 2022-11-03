const Application = require("../../models/Application");

module.exports = async (req, res, next) => {
  const application = await Application.findById(req.params.applicationId);

  if (!application) {
    return res.sendStatus(404);
  }

  req.application = application;

  next();
};
