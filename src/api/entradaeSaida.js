const express = require('express')
const router = express.Router()
const EntradaeSaidaService = require('../services/entradaeSaida')
const { EntradaeSaida } = require('../models')

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

router.get('/relatorio/:data_inicial', async (req, res) => {
  try {
    const { data_inicial } = req.params

    const entradaeSaida = await entradaeSaidaService.getByDate(data_inicial)
    res.json(entradaeSaida)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const entradaeSaida = req.body
    await entradaeSaidaService.create(entradaeSaida)

    res.status(201).json(entradaeSaida)
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
    await entradaeSaida.update(req.body)
    res.json(entradaeSaida)

  } catch (err) {
    res.status(400).send(err.message)
  }

})

module.exports = router
