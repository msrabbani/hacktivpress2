const jwt = require('jsonwebtoken')
require('dotenv').config()

var authUser = (req, res, next) => {
  var token = req.headers.auth
  jwt.verify(token, process.env.KEY_SCRT, (err, decoded) => {
    if (decoded) {
      req.dataUser = decoded
      next()
    } else {
      res.send(err)
    }
  })
}

module.exports = authUser
