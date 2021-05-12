/* global beforeAll afterAll describe test expect */
const request = require('supertest')
const config = require('../../../src/config')
const app = require('../../../src/app')
const { sequelize } = require('../../../src/models')

const API_USUARIOS = `${config.API_BASE}/usuarios`

const DEFAULT_USUARIO = {
    id: 1,
    nome: 'eufageniogalapeu',
    email: 'eufagenio@test.com',
    telefone: 77777777,
    senha: 'eufagenio',
    role: 'usuario'
}

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await request(app).post(API_USUARIOS).send(DEFAULT_USUARIO)
})

afterAll(async () => {
  await sequelize.close()
})

describe('Test the users path', () => {
  test('It should add new user', async () => {
    const newUsuario = {
      id: 2,
      nome: 'spiliquid',
      email: 'spiliquid@test.com',
      telefone: 999999,
      senha: 'mattosputao',
      role: 'usuario'
      
    }
    const response = await request(app).post(API_USUARIOS).send(newUsuario)
    expect(response.statusCode).toBe(201)
  })

  test('It should get all usuars', async () => {
    const response = await request(app).get(API_USUARIOS)
    const Usuarios = response.body
    expect(response.statusCode).toBe(200)
    expect(Usuarios.length).toBe(2)
  })

  test('you must be updating the data' , async()=> {

    const updateUsuario = {
        nome: 'spiliTo'
      }
      const response = await request(app).put(`${API_USUARIOS}/1`).send(updateUsuario)
      expect(response.statusCode).toBe(200)

      const usuario = response.body
      expect(response.statusCode).toBe(200)
      expect(usuario.nome).toBe("spiliTo")
  })

  test('you must be delete the data' , async()=> {
    const not_exist ={
        error: {
            message: 'não existe este usuario'
        }
    }
    const response = await request(app).delete(`${API_USUARIOS}/1`)
    
    expect(response.statusCode).toBe(400)
    expect(response.body).ToStrictEqual(not_exist)
  })


})