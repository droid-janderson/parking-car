/* global beforeAll afterAll describe test expect */
const request = require('supertest')
const config = require('../../../src/config')
const app = require('../../../src/app')
const { sequelize } = require('../../../src/models')

const API_PROPRIETARIOS = `${config.API_BASE}/proprietarios`

const DEFAULT_PROPRIETARIO = {
  nome: 'Proprietario 1',
  cpf: '951.111',
  telefone: 898989
}

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await request(app).post(API_PROPRIETARIOS).send(DEFAULT_PROPRIETARIO)
})

afterAll(async () => {
  await sequelize.close()
})

describe('Test the propries path', () => {
  test('It should add new user', async () => {
    const newProprietario = {
      nome: 'lusca',
      cpf: '22222222',
      telefone: 999999,
      observacao: 'vai trabalhar vagabundo'
    }
    const response = await request(app).post(API_PROPRIETARIOS).send(newProprietario)
    expect(response.statusCode).toBe(201)
  })

  test('It should get all propries', async () => {
    const response = await request(app).get(API_PROPRIETARIOS)
    const proprietarios = response.body
    expect(response.statusCode).toBe(200)
    expect(proprietarios.length).toBe(2)
  })
})