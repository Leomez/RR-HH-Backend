const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
    await sequelize.define('Tipo_de_licencia', {
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
            allowNull: false
        }
    }, {
        timestamps: false,
        paranoid: true
    })
}


