const { sequelize } = require("../../Config/db");
const { Empleado, Recibo_de_sueldo } = require("../../Config/db");

async function CargarVarios(datos) {
  datos.forEach(async (form) => {
    try {
      const trans = await sequelize.transaction();
      const empleado = await Empleado.findOne({
        where: {
          id: form.id_empleado,
        },
      });
      if (!empleado) {
        return {
          success: false,
          message: "Empleado no encontrado",
        };
      }
      const recibo = await Recibo_de_sueldo.create(
        {
          nombre_archivo: form.recibo.originalname,
          periodo: form.periodo,
          estado: "Sin firmar",
          url_archivo: form.recibo.filename,
        },
        { trans }
      );
      await empleado.addRecibo_de_sueldo(recibo, { trans });
      await trans.commit();
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Error al cargar recibo",
        error: error,
      };
    }
  });
  return {
    success: true,
    message: "Recibos cargados correctamente",
  };
  // console.log(form);
}

module.exports = { CargarVarios };
