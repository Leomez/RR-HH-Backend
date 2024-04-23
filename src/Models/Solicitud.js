const { DataTypes } = require('sequelize')

module.exports = async (sequelize) => {
    await sequelize.define('Solicitud', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,            
            primaryKey: true,
            allowNull: false,
            unique: true
        },        
        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/i,
                msg: 'El formato de fecha debe ser dd/mm/aaaa'
            }
        },
        motivo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        estado: {
            type: DataTypes.ENUM('Aprobado', 'Rechazado', 'En proceso'),
            allowNull: false,
            defaultValue: 'En proceso'
        },
        fecha_desde: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/i,
                msg: 'El formato de fecha debe ser dd/mm/aaaa'
            }
        },
        fecha_hasta: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/i,
                msg: 'El formato de fecha debe ser dd/mm/aaaa'
            }
        },
        hora_ingreso : {
            type: DataTypes.TIME,
            allowNull: true,
        },
        hora_salida : {
            type: DataTypes.TIME,
            allowNull: true,
        },
        dia_compensado: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/i,
                msg: 'El formato de fecha debe ser dd/mm/aaaa'
            }
        }, 
        dia_compensatorio: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/i,
                msg: 'El formato de fecha debe ser dd/mm/aaaa'
            }
        },
    },{
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'permiso'
    })
}

