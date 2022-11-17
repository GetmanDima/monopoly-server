const User = require("../../models/User")

module.exports = async (value) => {
  const isUser = await User.exists({nickname: value})

  if (isUser) {
    return Promise.reject()
  }
  
  return Promise.resolve()
};
