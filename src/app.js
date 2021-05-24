const express = require('express')
const cors = require('cors')
const routes = require('./api')
const config = require('./config')
const acl = require('express-acl')
const authMiddleware = require('./middlewares/auth')

const app = express()

acl.config({
  baseUrl: '/api',
  filename: 'nacl.json',
  path: 'src/config',
})

app.use(cors()) // https://github.com/expressjs/cors
app.use(express.json())
app.use(authMiddleware)
app.use(acl.authorize.unless({
  path: ['/api/auth/authenticate', '/api'] }))
app.use(config.API_BASE, routes)


module.exports = app
