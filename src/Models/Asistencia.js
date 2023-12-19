const {DataTypes } = require('sequelize');

// Define el modelo "Asistencia"
module.exports = async (sequelize) => {
    await sequelize.define('Asistencia', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true          
        },
        fecha: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        hora_ingreso: {
          type: DataTypes.TIME,
          allowNull: false
        },
        hora_pausa_comer: {
          type: DataTypes.TIME
        },
        hora_regreso_pausa: {
          type: DataTypes.TIME
        },
        hora_salida: {
          type: DataTypes.TIME
        },
        tiempo_pausa: {
          type: DataTypes.INTEGER
        },
        horas_trabajadas: {
          type: DataTypes.DECIMAL(5, 2)
        },
        horas_extras: {
          type: DataTypes.DECIMAL(5, 2)
        }
      },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        paranoid: true,
    })
} 


// Relaciones con otros modelos, si es necesario

// Exporta el modelo "Asistencia"
// module.exports = Asistencia;