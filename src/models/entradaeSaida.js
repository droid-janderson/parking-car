const entradaeSaida = (sequelize, DataTypes) => {
  const EntradaeSaida = sequelize.define('EntradaeSaida', {
    placa: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    tempo: {
      type: DataTypes.TIME,
      validate: {
        notEmpty: false
      }
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    data_entrada: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    data_saida: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: false
      }
    },
    
  }, {
    tableName: 'entradaeSaida'
  })

   EntradaeSaida.associate = (models) => {
     EntradaeSaida.belongsTo(models.Veiculo, {
       foreignKey: 'veiculoId',
       as: 'veiculos'
     })
   }

  return EntradaeSaida
}
  
module.exports = entradaeSaida
  