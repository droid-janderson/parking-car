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
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    data_entrada: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: false
      }
    },
    data_saida: {
      type: DataTypes.DATE,
      unique: true,
      validate: {
        notEmpty: false
      }
    },
    
  }, {
    tableName: 'entradaeSaida'
  })

   EntradaeSaida.associate = (models) => {
     EntradaeSaida.hasMany(models.Veiculo, {
       foreignKey: 'veiculoId',
       as: 'veiculo'
     })
   }

  return EntradaeSaida
}
  
module.exports = entradaeSaida
  