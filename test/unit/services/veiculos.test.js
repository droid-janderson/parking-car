const VeiculoService = require('../../../src/services/veiculos')
jest.mock('../../../src/models')
const { Veiculo } = require('../../../src/models')

let veiculoService
beforeAll(() => {
  veiculoService = new VeiculoService(Veiculo)
})

test('should fetch all veiculos', async () => {
  const veiculos = [{
    "id": 1,
    "placa": "cd",
    "cor": "vermelho",
    "modelo": "monza",
    "usuarioId": 1
  }, {
    "id": 2,
    "placa": "bc",
    "cor": "vermelho",
    "modelo": "monza",
    "usuarioId": 1
  },]
  Veiculo.findAll.mockResolvedValue(veiculos)
  const resp = await veiculoService.get()
  expect(resp).toEqual(veiculos)
})