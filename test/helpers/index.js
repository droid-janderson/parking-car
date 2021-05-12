const bcript = require('bcryptjs')
const request = require('supertest')
const config = require('../../src/config')
const app = require('../../src/app')
const { sequelize } = require('../../src/models')

const SALT = 8
const API_CADASTRO = `${config.API_BASE}/usuarios`
const API_AUTH = `${config.API_BASE}/auth/authenticate`

const USER_TEST = {
  nome: "teste",
  email: "teste@email.com",
  telefone: 8822,
  senha: bcript.hashSync("1234", SALT),
  role: "gestor"
}

async function startDatabase() {
  await sequelize.sync({ force: true })
}

async function cadastro() {
  await startDatabase()
  await request(app).post(API_CADASTRO).send(USER_TEST)
}

async function signin() {
  await cadastro()
  const response = await request(app).post(API_AUTH).send(USER_TEST)
  return response.body.token
}

const helper = {
  USER_TEST,
  signin
}

module.exports = helper