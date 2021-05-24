const UsuarioService = require('../../../src/services/usuarios')
jest.mock('../../../src/models')
const { Usuario } = require('../../../src/models')

var DEFAULT_USUARIO = {
  id: 1,
  nome: 'admin',
  email: 'admin@test.com',
  telefone: 77777777,
  senha: 'admin',
  role: 'admin'
}

let usuarioService
beforeAll(async () => {
  usuarioService = new UsuarioService(Usuario)
  
})


test('should fetch all user ', async () => {
  const usuarios = [{
    "id": 1,
    nome: "test",
    email: "test@teste.com",
    telefone: 88889,
    senha: "12345",
    role: "gestor"
  }, {
    
    "id": 2,
    nome: "test2",
    email: "test2@teste.com",
    telefone: 88889,
    senha: "12345",
    role: "gestor"
  }]
  Usuario.findAll.mockResolvedValue(usuarios)
  const resp = await usuarioService.get()
  expect(resp).toEqual(usuarios)

})


test('creating user', async()=> {
  const usuarios = {
     "id": 4,
     nome: "testee",
     email: "testeee@teste.com",
     telefone: 88999,
     senha: "123478",
     role: "gestor"
  }
 
  try {
    Usuario.create.mockResolvedValue(usuarios)

    const res = await usuarioService.create(usuarios)
    await expect(res).toEqual(usuarios)
  } catch (error) {
    console.log(error)
  }
   
})

test('testing if you are already registered', async()=> {
  const usuarios = {
    id: 1,
    nome: 'admin',
    email: 'admin@test.com',
    telefone: 77777777,
    senha: 'admin',
    role: 'admin'
  }
 
  try {
    Usuario.create.mockResolvedValue(usuarios)

    const res = await usuarioService.create(usuarios)
    await expect(res).toEqual(usuarios)
  } catch (error) {
    console.log("ja cadastrado")
  }
   
})

test('update ', async () => {
  DEFAULT_USUARIO = {
    nome: "testes",
    telefone: 8888999,
  }

  try {
    Usuario.findOne.mockResolvedValue({ id: 1 })
    Usuario.update.mockResolvedValue(DEFAULT_USUARIO)
    const ress = await usuarioService.update({ id: 1 } ,DEFAULT_USUARIO)
    expect(ress.nome).toString({ nome: "testes"})
  } catch (error) {
    console.log(error)
  }

})

