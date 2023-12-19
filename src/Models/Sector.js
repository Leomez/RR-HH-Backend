
const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
  await sequelize.define('Sector', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,      
      primaryKey: true
    },
    nombre_sector: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // jefe: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model: 'Empleado',
    //     key: 'id'
    //   }
    // }
  }, {
    timestamps: true,
    createdAt: 'creado',
    updatedAt: 'actualizado',
    underscored: true,
    tableName: 'sector',
    paranoid: true,
  }); 
  
}