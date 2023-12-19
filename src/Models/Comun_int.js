const { DataTypes } = require('sequelize');


module.exports = async (sequelize) => {
   await sequelize.define('comun_int', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,            
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        asunto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mensaje: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        prioridad: {
            type: DataTypes.ENUM('Alta', 'baja'),
            allowNull: false
        },
        destinatario: {
            type: DataTypes.ENUM('General', 'Personalizado'),
            allowNull: false,
        }
    }, {
        timestamps: true,
        createdAt: 'creado',
        updatedAt: 'modificado',
        paranoid: true
    })
}

