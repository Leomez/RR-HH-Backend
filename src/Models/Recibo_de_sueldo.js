const { DataTypes } = require("sequelize");


module.exports = async (sequelize) => {
    await sequelize.define('recibo_de_sueldo', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,            
            primaryKey: true,
            allowNull: false,
            unique:true
        },
        nombre_archivo: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        periodo : {
            type: DataTypes.STRING,
            allowNull: false
        },
        monto: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        estado: {
            type: DataTypes.ENUM('Firmado', 'Sin firmar'),
            allowNull: false,
            defaultValue: 'Sin firmar'        
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        fecha_firma: {
            type: DataTypes.DATE,
            allowNull: true
        },
        url_archivo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'creado',
        updatedAt: 'actualizado',
        paranoid: true
    })
}


