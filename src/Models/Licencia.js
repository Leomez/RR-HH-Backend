const { DataTypes } = require('sequelize')



module.exports = async (sequelize) => {
    await sequelize.define('Licencia', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,            
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        fecha_ini: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // id_tipo_licencia: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //     references: {
        //         model: 'Tipo_de_licencia',
        //         key: 'id'
        //     }
        // },
        // id_permiso: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //     references: {
        //         model: 'Permiso',
        //         key: 'id'
        //     }
        // }
    }, {
        timestamps: true,
        createdAt: 'creada',
        updatedAt: 'actualizada',
        paranoid: true,
    }
    )
}

