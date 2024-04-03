const { DataTypes } = require('sequelize');
// const sequelize = require('../../infraestructure/config/sequelize')

module.exports = async (sequelize) => {
    await sequelize.define('supervisor', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,            
            primaryKey: true
        },
        codigo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }        
        
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        paranoid: true,
    })
}

