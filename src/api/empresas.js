const express = require('express')
const router = express.Router()
const EmpresaService = require('../services/empresas')
const { Empresa } = require('../models')

const empresaService = new EmpresaService(Empresa)

router.get('/', async (req, res) => {
  try {
    const empresas = await empresaService.get()
    res.json(empresas)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const empresa = await empresaService.getById(id)
    res.json(empresa)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const { nome, cnpj, cidade, telefone } = req.body
    await empresaService.create({ nome, cnpj, cidade, telefone })

    res.status(201).json({ nome, cnpj, cidade, telefone })
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await empresaService.delete(id)
    if (id) {
      res.send({
        message: "empresa deletado com Sucesso!"
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
    const empresa = await empresaService.getById(req.params.id)
    await empresa.update(req.body)
    res.json(empresa)

  } catch (err) {
    res.status(400).send(err.message)
  }

})

module.exports = router

