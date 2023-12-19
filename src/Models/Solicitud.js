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
        solicitante: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Empleado',
                key: 'id'
            }
        },       
        tipo_de_permiso: {
            type: DataTypes.ENUM('Salir temprano', 'Cambio de turno', 'Licencia', 'Ausencia a compenzar'),
            allowNull: false
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/,
                msg: 'El formato de fecha debe ser dd/mm/aaaa'
            }
        },
        motivo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM('Aprobado', 'Rechazado', 'En proceso'),
            allowNull: false,
            defaultValue: 'En proceso'
        },    
        // id_empleado: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //     references: {
        //         model: 'Empleado',
        //         key: 'id'
        //     }
        // },
        // jefe_autorizante: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //     references: {
        //         model: 'Empleado',
        //         key: 'id'
        //     }
        // },
        // certificado: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //     references: {
        //         model: 'Certificado',
        //         key: 'id'
        //     }
        // }

},{
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'permiso'
})
}

