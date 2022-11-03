module.exports = (value) => {
  if (isNaN(Date.parse(value))) {
    return Promise.reject()
  }

  return Promise.resolve()
}
