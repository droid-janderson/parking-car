const express = require('express')
const router = express.Router()
const EntradaeSaidaService = require('../services/entradaeSaida')
const { EntradaeSaida } = require('../models')
const VeiculoService = require('../services/veiculos')
const { Veiculo } = require('../models')

const moment = require('moment')

const entradaeSaidaService = new EntradaeSaidaService(EntradaeSaida)
const veiculoService = new VeiculoService(Veiculo)


router.get('/', async (req, res) => {
  try {
    const entradaeSaidas = await entradaeSaidaService.get()
    res.json(entradaeSaidas)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const entradaeSaida = await entradaeSaidaService.getById(id)
    res.json(entradaeSaida)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get('/relatorio/', async (req, res) => {
  try {
    const { data } = req.body

    const entradaeSaida = await entradaeSaidaService.getByDate(data)
    res.json(entradaeSaida)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {

    const { veiculoId, placa } = req.body
    
    const veiculo = await veiculoService.getById(veiculoId)

    if (veiculo.placa == placa && veiculo.id == veiculoId) {
      
      await entradaeSaidaService.create({ placa }, veiculoId)
      res.status(201).json({ veiculoId, placa })

    }

    throw new Error('Veiculo invalid')
    
    
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await entradaeSaidaService.delete(id)
    if (id) {
      res.send({
        message: "entrada deletado com Sucesso!"
      });
    } else {
      res.send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
      });
    }
    next()
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const entradaeSaida = await entradaeSaidaService.getById(req.params.id)

    const usuarioDTO = req.body

    if (usuarioDTO.status === 2) {
      usuarioDTO.data_saida = moment().format()
    } else {
      throw new Error('Status invalid')
    }

    await entradaeSaida.update(usuarioDTO)

    res.json(entradaeSaida)

  } catch (err) {
    res.status(400).send(err.message)
  }

})

module.exports = router
