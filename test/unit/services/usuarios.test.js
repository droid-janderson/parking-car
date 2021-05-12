const { Usuario } = require('../../src/models')
const bcrypt = require('bcryptjs')
const request = require('supertest')


describe('Authentication', () => {
  beforeEach(async() => {
    await truncate();
  })

  it('should receive JWT Token when authenticated with valid credentials', async () => {
    const usuario = await usuario.create({
      "id": 1,
      nome: "teste",
      email: "teste@teste.com",
      telefone: 8888,
      senha: "1234",
      role: "gestor"
    })

    console.log(usuario)

    expect(usuario.usuario).toBe("teste")
  })

})