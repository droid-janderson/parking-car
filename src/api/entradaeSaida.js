const express = require('express')
const router = express.Router()
const EntradaeSaidaService = require('../services/entradaeSaida')
const { EntradaeSaida } = require('../models')
const moment = require('moment')

const entradaeSaidaService = new EntradaeSaidaService(EntradaeSaida)

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

router.get('/relatorio/:data', async (req, res) => {
  try {
    const { data } = req.params

    const entradaeSaida = await entradaeSaidaService.getByDate(data)
    res.json(entradaeSaida)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const { veiculoId, placa, status } = req.body
    await entradaeSaidaService.create({ placa, status }, veiculoId)

    res.status(201).json({ veiculoId, placa, status })
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
        message: "usuario deletado com Sucesso!"
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
