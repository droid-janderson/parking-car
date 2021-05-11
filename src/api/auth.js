const express = require('express')
const router = express.Router()
const AuthService = require('../services/auth')
const { Usuario } = require('../models')

const authService = new AuthService(Usuario)

router.post('/authenticate', async (req, res) => {
  try {
    const { email, senha, role } = req.body
    const { token, usuario } = await authService.signin(email, senha, role)
    res.json({ auth: true, usuario: usuario, token: token })
  } catch (err) {
    res.status(401).send({ auth: false, token: null, message: err.message })
  }
})

module.exports = router