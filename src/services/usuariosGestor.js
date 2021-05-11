class UsuarioService {
  constructor(Usuario) {
    this.Usuario = Usuario
  }

  async get() {
    try {
      return await this.Usuario.findAll({ where: { role: 'gestor' } }, {
        attributes: ['id', 'nome', 'email', 'telefone', 'senha', 'role', 'empresaId']
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getById(id) {
    try {
      return await this.Usuario.findByPk(id, { where: { role: 'gestor' }, include: { association: 'empresa' } })
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete(id) {

    try {
      await this.Usuario.destroy({ where: { id: id, role: 'gestor' } })
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = UsuarioService