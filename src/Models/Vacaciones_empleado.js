const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    await sequelize.define('Vacaciones_empleado', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        empleado_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dias_pendientes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated'
    })
}     

