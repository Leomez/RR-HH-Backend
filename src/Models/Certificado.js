const { DataTypes } = require('sequelize');
// const sequelize = require('../../infraestructure/config/sequelize')

module.exports = async (sequelize) => {
    await sequelize.define('certificado', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,            
            primaryKey: true
        },        
        url_archivo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        solicitud_id: {
            type: DataTypes.UUID,
            allowNull: false
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        paranoid: true,
    })
}
