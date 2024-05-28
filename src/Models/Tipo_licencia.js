const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
    await sequelize.define('Tipo_licencia',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            cantDias: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false

            }
        },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: 'updated'
        }
    )
}


