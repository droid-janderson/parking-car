const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return next()
  };

  jwt.verify(token, config.auth.key, (err, decoded) => {
    req.decoded = decoded
    next()
  })
}