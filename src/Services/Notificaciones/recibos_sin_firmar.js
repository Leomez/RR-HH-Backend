const { Recibo_de_sueldo } = require("../../Config/db");
const { formatearFecha } = require("../../util/formatearFecha");

const recibos_sin_firmar = async (id) => {
  try {
    const recibos = await Recibo_de_sueldo.findAll({
      where: {
        EmpleadoId: id,
        estado: "Sin firmar",
      },
    });
    
    const notificacion = recibos.map((recibo) => {
      return {
        tag: "recibos",
        titulo: "Tenes un recibo sin firmar",
        contenido: `Un recibo de sueldo del mes de ${recibo.dataValues.periodo} esta sin firmar `,
        fecha: formatearFecha(recibo.dataValues.creado),
        accion: "Firmar",
      };
    });

    return notificacion;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { recibos_sin_firmar };
