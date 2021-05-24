class VeiculoService {
  constructor(Veiculo) {
    this.Veiculo = Veiculo
  }

  async get() {
    try {
      return await this.Veiculo.findAll({
        attributes: ['id', 'placa', 'cor', 'tipo', 'modelo']
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getByPlaca(placa) {
    try {
      return await this.Veiculo.findOne({
        where: { placa: placa },
        include: { association: 'entradaeSaida' },
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getById(id) {
    try {
      return await this.Veiculo.findByPk(id, {
        include: { association: 'entradaeSaida' }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async create(veiculoDTO) {
    try {
      await this.Veiculo.create(veiculoDTO)
    } catch (err) {
      console.log('ERROR:: ', err.message)
      throw new Error(err.message)
    }
  }
  async update(id, veiculoDTO) {
    try {

      const veiculo = await this.Veiculo.findOne({ where: { id: id } })
      if (veiculo) {
        await veiculo.save(veiculoDTO)
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete(id) {

    try {
      await this.Veiculo.destroy({ where: { id: id } })
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = VeiculoService
