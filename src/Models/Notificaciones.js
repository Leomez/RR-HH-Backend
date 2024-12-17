const { DataTypes } = require("sequelize");


module.exports = async (sequelize) => {
    await sequelize.define('Notificaciones',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            empleado_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            tipo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mensaje: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            estado: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'pending', // Puede ser 'pending' o 'read'
            },

        },
        {
            timestamps: false,            
            paranoid: true,
        }
    );

};
