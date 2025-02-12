
const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
  await sequelize.define('Empleado', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,      
      primaryKey: true,
      unique: true
    },
    legajo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: {
          msg: 'El DNI debe contener solo números'
        },
        isInRange(value) {
          if (!/^\d{7,8}$/.test(value)) {
            throw new Error('El DNI debe tener entre 7 y 8 caracteres');
          }
        },
      }
    },
    nombre_empleado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido_empleado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_nac: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tel_alternativo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_ingr: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cargo: {
      type: DataTypes.ENUM('Gerente', 'Administrador', 'Jefe', 'Supervisor', 'Empleado'),
      allowNull: false
    },
    turno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoria: {
      type: DataTypes.ENUM('1°', '2°', '3°','Fuera de Convenio'),
      allowNull: false
    },
    permisos: {
      type: DataTypes.ENUM('ADMIN', 'USER', 'SUP')
    },
    estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      allowNull: true
    }
  }, {
    underscored: true,
    timestamps: true,
    createdAt: 'creado',
    updatedAt: 'actualizado',
    paranoid: true,
  }); 
}


