const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const veiculosRoutes = require('./veiculos')
const usuariosRoutes = require('./usuarios')
const empresasRoutes = require('./empresas')
const entradaeSaidaRoutes = require('./entradaeSaida')
const usuariosGestorRoutes = require('./usuariosGestor')
const usuariosFuncionariosRoutes = require('./usuariosFuncionario')


router.get('/', function (req, res) {
  res.status(200).send('<h1 style="text-align: center">App Online!</h1>')
})

router.use('/auth', authRoutes)
router.use('/veiculos', veiculosRoutes)
router.use('/usuarios', usuariosRoutes)
router.use('/empresas', empresasRoutes)
router.use('/entrada-saida', entradaeSaidaRoutes)
router.use('/usuarios-gestor', usuariosGestorRoutes)
router.use('/usuarios-funcionario', usuariosFuncionariosRoutes)


module.exports = router