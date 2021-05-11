class EmpresaService {
  constructor(Empresa) {
    this.Empresa = Empresa
  }

  async get() {
    try {
      return await this.Empresa.findAll({
        attributes: ['id', 'nome', 'cnpj', 'cidade', 'telefone']
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getById(id) {
    try {
      return await this.Empresa.findByPk(id, {
        include: { association: 'usuarios' }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async create(empresaDTO) {
    try {
      await this.Empresa.create(empresaDTO)
    } catch (err) {
      console.log('ERROR:: ', err.message)
      throw new Error(err.message)
    }
  }
  async update(id, empresaDTO) {
    try {

      const empresa = await this.Empresa.findOne({ where: { id: id } })
      if (empresa) {
        await empresa.save(empresaDTO)
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete(id) {

    try {
      await this.Empresa.destroy({ where: { id: id } })
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = EmpresaService
