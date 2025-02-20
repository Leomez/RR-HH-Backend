const { Empleado, Op, sequelize } = require("../../Config/db");

const cumpleanios = async () => {
  try {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11

    const cumpleanieros = await Empleado.findAll({
      where: sequelize.where(sequelize.fn('date', sequelize.col('fecha_nac')), '=', fechaActual)
      // where: {
      //   [Op.and]: [
      //     // Utilizamos operadores de Sequelize para comparar fechas sin usar funciones específicas de SQL
      //     sequelize.where(sequelize.fn('extract', 'day', sequelize.col('fecha_nac')), diaActual),
      //     sequelize.where(sequelize.fn('extract', 'month', sequelize.col('fecha_nac')), mesActual),
      //   ],
      // },
    });
    // console.log(cumpleanieros);
    const cumples = cumpleanieros.map((c) => {
      return {
        tag: "cumple",
        titulo: "Feliz Cumple",
        contenido: `Hoy cumple años ${c.dataValues.nombre_empleado.toUpperCase()} ${c.apellido_empleado.toUpperCase()}.\n¡Le deseamos un hermoso día!`,
        fecha: fechaActual.toLocaleDateString("es-AR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        accion: "Ver mas",
      };
    });

    return cumples;

        
  } catch (error) {
    console.log(error);
  }
};

module.exports = { cumpleanios };
