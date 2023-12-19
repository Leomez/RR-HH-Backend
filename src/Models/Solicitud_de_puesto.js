const { DataTypes } = require("sequelize");


module.exports = async (sequelize) => {
    await sequelize.define('solicitud_de_puesto', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,            
            allowNull: false,
            primaryKey: true,
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
        // id_puesto: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //     references: {
        //         model: 'Puesto',
        //         key: 'id'
        //     }
        // },
        fecha_solicitud: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/  //validacion de formato DD/MM/AAAA
            }
        },
        comentario: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('Aprobado', 'Rechazado', 'En proceso'),
            allowNull: false,
            defaultValue: 'En proceso'
        }
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: 'actualizado',
        paranoid: true
    })
    
}