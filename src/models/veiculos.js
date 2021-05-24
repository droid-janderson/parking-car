const veiculo = (sequelize, DataTypes) => {
  const Veiculo = sequelize.define('Veiculo', {
    placa: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

  }, {
    tableName: 'veiculos'
  })

  Veiculo.associate = (models) => {
    Veiculo.hasOne(models.EntradaeSaida, {
      foreignKey: 'veiculoId',
      as: 'entradaeSaida'
    })
  }

  return Veiculo
}

module.exports = veiculo