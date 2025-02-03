const { DataTypes } = require('sequelize');


module.exports = async (sequelize) => {
  await sequelize.define('domicilio', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,      
      unique: true
    },
    calle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    piso: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    depto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cod_postal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'creado',
    updatedAt: 'actualizado',
    paranoid: true,
  })
}

