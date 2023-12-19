const { DataTypes } = require('sequelize');


module.exports = async (sequelize) => {
    await sequelize.define('Comun_int_empl', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,            
        },
        // id_empleado: {
        //     type: DataTypes.UUID,            
        //     references: {
        //         model: 'Empleado',
        //         key: 'id'
        //     }
        // },
        // id_comunicacion_interna: {
        //     type: DataTypes.UUID,            
        //     references: {
        //         model: 'Comun_int',
        //         key: 'id'
        //     }
        // },
        leida: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: true,
        createdAt: 'creado',
        updatedAt: 'actualizado',
        paranoid: true,        
    })
}


