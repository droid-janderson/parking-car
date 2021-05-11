const empresa = (sequelize, DataTypes) => {
  const Empresa = sequelize.define('Empresa', {
    nome: {
      type: DataTypes.STRING,
      alloiwNull: false,
      validate: {
        notEmpty: true
      }
    },
    cnpj: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    cidade: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    telefone: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  
  }, {
    tableName: 'empresas'
  })

  Empresa.associate = (models) => {
    Empresa.hasMany(models.Usuario, {
      foreignKey: 'empresaId',
      as: 'usuarios'
    })
  }

  return Empresa
}

module.exports = empresa
