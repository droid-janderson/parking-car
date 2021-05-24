const express = require('express')
const router = express.Router()
const VeiculoService = require('../services/veiculos')
const { Veiculo } = require('../models')

const veiculoService = new VeiculoService(Veiculo)

router.get('/', async (req, res) => {
  try {
    const veiculos = await veiculoService.get()
    res.json(veiculos)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const veiculo = await veiculoService.getById(id)
    res.json(veiculo)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get('/placa/:placa', async (req, res) => {
  try {
    const { placa } = req.params

    const veiculo = await veiculoService.getByPlaca(placa)
    res.json(veiculo)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const { placa, cor, tipo, modelo } = req.body
    await veiculoService.create({ placa, cor, tipo, modelo })

    res.status(201).json({ placa, cor, tipo, modelo })
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await veiculoService.delete(id)
    if (id) {
      res.send({
        message: "Veiculo deletado com Sucesso!"
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
    const veiculo = await veiculoService.getById(req.params.id)
    await veiculo.update(req.body)
    res.json(veiculo)

  } catch (err) {
    res.status(400).send(err.message)
  }

})

module.exports = router
