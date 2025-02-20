const { DataTypes } = require("sequelize");


module.exports = async (sequelize) => {
    await sequelize.define('Licencia_empleado',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            empleado_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            tipo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dias_pendientes: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ultima_renovacion: {
                type: DataTypes.DATE,
                allowNull: true
            },
        },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: 'updated'
        }
    )
}