const moment = require('moment');

class EntradaeSaidaService {
  constructor(EntradaeSaida) {
    this.EntradaeSaida = EntradaeSaida
  }

  async get() {
    try {
      return await this.EntradaeSaida.findAll({
      })
    } catch (err) {
      throw new Error(err)
    }
  }x

  async getByDate(data) {
    try {
      return await this.EntradaeSaida.findAll({
        where: {
          data_entrada: data
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getById(id) {
    try {
      return await this.EntradaeSaida.findByPk(id)
    } catch (err) {
      throw new Error(err)
    }
  }

  async create(entradaeSaidaDTO, veiculoId) {
    try {
      entradaeSaidaDTO.veiculoId = veiculoId
      entradaeSaidaDTO.data_entrada = moment().format()
      await this.EntradaeSaida.create(entradaeSaidaDTO)
    } catch (err) {
      console.log('ERROR:: ', err.message)
      throw new Error(err.message)
    }
  }
  async update(id, entradaeSaidaDTO) {
    try {
      await this.EntradaeSaida.findOne({ where: { id: id } })
      await this.EntradaeSaida.save(entradaeSaidaDTO)
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete(id) {

    try {
      await this.EntradaeSaida.destroy({ where: { id: id } })
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = EntradaeSaidaService
