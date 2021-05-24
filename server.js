const app = require('./src/app');
const config = require('./src/config')
const { sequelize } = require('./src/models')

sequelize.sync().then(() => {
  app.listen(config.PORT, () => {
    console.log(`servidor rodando na porta ${config.PORT}...`)
  })
})
