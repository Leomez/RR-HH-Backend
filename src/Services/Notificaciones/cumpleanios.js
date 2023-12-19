const { Empleado, Op, sequelize } = require("../../Config/db");

const cumpleanios = async () => {
  try {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11

    const cumpleanieros = await Empleado.findAll({
      where: {
        [Op.and]: [
          sequelize.literal(`DAY(fecha_nac) = ${diaActual}`),
          sequelize.literal(`MONTH(fecha_nac) = ${mesActual}`),
        ],
      },
    });

    // if (cumpleanieros.length > 0) {
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

    return cumples
    // return {
    //   titulo: "Feliz cumple",
    //   contenido:
    //     cumpleanieros.length === 1
    //       ? `Hoy cumple años ${cumpleanieros.map(
    //           (e) =>
    //             `${e.dataValues.nombre_empleado} ${e.dataValues.apellido_empleado}`.toUpperCase()
    //         )} Les deseamos ¡¡Muy feliz cumple!!`
    //       : `Hoy cumplen años: ${cumpleanieros.map(
    //           (e) =>
    //             `${e.dataValues.nombre_empleado} ${e.dataValues.apellido_empleado} `.toUpperCase()
    //         )} Les deseamos ¡¡Muy feliz cumple!!`,
    //   fecha: fechaActual.toLocaleDateString("es-AR", {
    //     day: "numeric",
    //     month: "short",
    //     year: "numeric",
    //   }),
    //   accion: "Ver mas",
    // };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { cumpleanios };
