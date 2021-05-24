const moment = require('moment')
const Time = require('../middlewares/tempo')
const time = new Time()

class EntradaeSaidaService {
  constructor(EntradaeSaida) {
    this.EntradaeSaida = EntradaeSaida
  }

  async get() {
    try {
      return await this.EntradaeSaida.findAll({
        attributes: ['id', 'placa', 'status', 'tempo', 'data_entrada', 'data_saida', 'veiculoId']
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
        },
        attributes: ['id', 'placa', 'status', 'tempo', 'data_entrada', 'data_saida'],
        include: { association: 'veiculos' }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getById(id) {
    try {
      return await this.EntradaeSaida.findByPk(id, {
        attributes: ['id', 'placa', 'status', 'tempo', 'data_entrada', 'data_saida'],
        include: { association: 'veiculos' }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async create(entradaeSaidaDTO, veiculoId) {
    try {
      var tempo_init = time.iniciar()
      
      entradaeSaidaDTO.veiculoId = veiculoId
      entradaeSaidaDTO.data_entrada = moment().format()

      await this.EntradaeSaida.create(entradaeSaidaDTO)
      return tempo_init
    } catch (err) {
      console.log('ERROR:: ', err.message)
      throw new Error(err.message)
    }
  }
  
  async update(id, entradaeSaidaDTO) {
    try {
      time.parar()
      entradaeSaidaDTO.tempo = time.tempo()
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
