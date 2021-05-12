const bcrypt = require('bcryptjs')
const SALT = 8

class UsuarioService {
  constructor(Usuario, AuthService) {
    this.Usuario = Usuario
    this.AuthService = AuthService
  }

  async get() {
    try {
      return await this.Usuario.findAll({
        attributes: ['id', 'nome', 'email', 'telefone', 'senha','role', 'empresaId']
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getById(id) {
    try {
      return await this.Usuario.findByPk(id,{
        attributes: ['id', 'nome', 'email', 'telefone', 'senha', 'role'],
        include: { association: 'empresa' }})
    } catch (err) {
      throw new Error(err)
    }
  }

  async create(usuarioDTO, empresaId) {
    try {
      usuarioDTO.empresaId = empresaId
      usuarioDTO.senha = bcrypt.hashSync(usuarioDTO.senha, SALT)

      await this.Usuario.create(usuarioDTO)
    } catch (err) {
      console.log('ERROR:: ', err.message)
      throw new Error(err.message)
    }
  }
  
  async update(id, usuarioDTO) {
    try {
      const usuario = await this.Usuario.findOne({ where: { id: id } })
      usuarioDTO.senha = bcrypt.hashSync(usuarioDTO.senha, SALT)

      if (usuario) {
        await usuario.save(usuarioDTO)
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete(id) {

    try {
      await this.Usuario.destroy({ where: { id: id } })
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = UsuarioService
