/* global beforeAll afterAll describe test expect */
const request = require('supertest')
const config = require('../../../src/config')
const app = require('../../../src/app')
const { sequelize } = require('../../../src/models')
const { signin } = require('../../helpers')

const API_EMPRESA = `${config.API_BASE}/empresas`

const DEFAULT_EMPRESA = {
  nome: 'EMPRE',
  cnpj: '951.111',
  cidade: 'Picos',
  telefone: 898989
}

let USER_TOKEN = ''
beforeAll(async () => {
  USER_TOKEN = await signin()
  await request(app).post(API_EMPRESA)
    .set('Authorization', USER_TOKEN)
    .send(DEFAULT_EMPRESA)
})

afterAll(async () => {
  await sequelize.close()
})

describe('Test the propries path', () => {
  test('It should add new user', async () => {
    const newEmpresa = {
      nome: 'teste',
      cnpj: '22222222',
      cidade: 'Picos',
      telefone: 999999
    }
    const response = await request(app)
      .post(API_EMPRESA).send(newEmpresa)
      .set('Authorization', USER_TOKEN)
    expect(response.statusCode).toBe(201)
  })

  test('It should get all empreses', async () => {
    const response = await request(app)
      .get(API_EMPRESA)
      .set('Authorization', USER_TOKEN)
    const empresas = response.body
    expect(response.statusCode).toBe(200)
    expect(empresas.length).toBe(2)
  })
})