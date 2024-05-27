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
        tipo: {
            type: DataTypes.UUID,
            allowNull: false,            
        },        
        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/i,
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
            }
        },
        fecha_hasta: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/i,
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
        fecha_permiso: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/i,
            }
        }, 
        dia_compensatorio: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/i,
            }
        },
        diasSolicitados: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },{
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'permiso'
    })
}

