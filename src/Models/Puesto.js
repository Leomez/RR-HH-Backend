const { DataTypes } = require('sequelize')


module.exports = async (sequelize) => {
    await sequelize.define('puesto', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,            
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requisitos: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        salario: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        fecha_expiracion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/
            }
        }, 
        estado: {
            type: DataTypes.ENUM('vacante', 'cerrado'),
            allowNull: false
        },
        // id_sector: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //     // references: {
        //     //     model: 'Sector',
        //     //     key: 'id'
        //     // }
        // }
    
    }, {
        timestamps: true,
        createdAt: 'Fecha_publicacion',
        updatedAt: 'Actualizado',
        paranoid: true
    })
}

