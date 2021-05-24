/* global beforeAll afterAll describe test expect */
const request = require('supertest')
const config = require('../../../src/config')
const app = require('../../../src/app')
const { sequelize } = require('../../../src/models')
const { signin } = require('../../helpers')

const API_ENTRADA_SAIDA = `${config.API_BASE}/entrada-saida`

const DEFAULT_ENTRADA_SAIDA = {
  placa: "bc",
  status: 1,
  veiculoId: 1,
}

let USER_TOKEN = ''
beforeAll(async () => {
  await sequelize.sync({ force: true })
  async () => {
    USER_TOKEN = await signin()
    await request(app).post(API_ENTRADA_SAIDA)
      .set('Authorization', USER_TOKEN)
      .send(DEFAULT_ENTRADA_SAIDA)
  }
})

afterAll(async () => {
  await sequelize.close()
})

describe('Test the propries path', () => {
  test('It should add new user', async () => {
    const newEntradaSaida = {
      placa: "ba",
      status: 1,
      veiculoId: 2,
    }
    const response = await request(app).post(API_ENTRADA_SAIDA).set('Authorization', USER_TOKEN).send(newEntradaSaida)
    expect(response.statusCode).toBe(201)
  })

  // test('It should get all propries', async () => {
  //   const response = await request(app).get(API_ENTRADA_SAIDA)
  //   const entradaeSaida = response.body
  //   expect(response.statusCode).toBe(200)
  //   expect(entradaeSaida.length).toBe(2)
  // })

})