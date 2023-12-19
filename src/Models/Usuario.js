const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
    await sequelize.define('usuario', {
        id: {
            type: DataTypes.STRING,            
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        rol: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'creado',
        updatedAt: 'actualizado',
        paranoid: true
    })
}


