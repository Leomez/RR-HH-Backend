const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
  await sequelize.define("Tipo_vacaciones",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      nombre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      cantDias: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: 'updated'
    }
  )

}
