const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
    await sequelize.define('Tipo_de_solicitud', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        canti_dias: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        caracteristicas: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,
        paranoid: true
    })
}


