const express = require('express')
const router = express.Router()
const UsuarioService = require('../services/usuarios')
const { Usuario } = require('../models')

const usuarioService = new UsuarioService(Usuario)

router.get('/', async (req, res) => {
  try {
    const usuarios = await usuarioService.get()
    res.json(usuarios)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const usuario = await usuarioService.getById(id)
    res.json(usuario)
  } catch (err) {
    res.status(400).send(err.message)
  }
})


router.post('/', async (req, res) => {
  try {
    const { empresaId, nome, email, telefone, senha, role } = req.body

    await usuarioService.create({ nome, email, telefone, senha, role }, empresaId)

    res.status(201).json({ empresaId, nome, email, telefone, role })
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await usuarioService.delete(id)
    if (id) {
      res.send({
        message: "Usuario deletado com Sucesso!"
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
    const usuario = await usuarioService.getById(req.params.id)
    await usuario.update(req.body)
    res.json(usuario)

  } catch (err) {
    res.status(400).send(err.message)
  }


})

module.exports = router
