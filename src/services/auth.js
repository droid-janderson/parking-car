const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/default.json')

class AuthService {
  constructor(usuario) {
    this.usuario = usuario
  }

  genToken(usuario) {
    return jwt.sign({ id: usuario.id, role: usuario.role }, config.auth.key, { expiresIn: config.auth.tokenExpiresIn })
  }

  async signin(email, senha, role) {
    const usuario = await this.usuario.findOne({
      where: {
        email: email
      }
    })

    if (usuario === null) {
      throw new Error('Invalid Email or Password!')
    }

    const senhaValida = bcrypt.compareSync(senha, usuario.senha)
    if (!senhaValida) {
      throw new Error('Invalid Email or Password!')
    }

    if (role !== usuario.role) {
      throw new Error('Invalid Role!')
    }
    const token = this.genToken(usuario)
    const { nome } = usuario
    return { token, usuario: { nome, email, role } }
  }
}

module.exports = AuthService