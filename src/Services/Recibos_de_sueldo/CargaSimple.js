const { sequelize } = require("../../Config/db");
const { Empleado, Recibo_de_sueldo } = require("../../Config/db");

async function CargaSimple(data) {
  const trans = await sequelize.transaction();
  console.log(data.id_empleado);
  try {
    const empleado = await Empleado.findOne({
      where: { id: data.id_empleado },
    });
    if (!empleado) {
      return {
        success: false,
        message: "Empleado no encontrado",
      };
    }

    const recibo = await Recibo_de_sueldo.create(
      {
        nombre_archivo: data.recibo.originalname,
        periodo: data.periodo,
        monto: data.monto,
        descripcion: data.reciboDesc,
        estado: "Sin firmar",
        url_archivo: data.recibo.filename,
      },
      { trans }
    );
    await empleado.addRecibo_de_sueldo(recibo, { trans });
    await trans.commit();
    return {
      success: true,
      message: "Recibos cargados",
      data: recibo
    };
  } catch (error) {
    await trans.rollback();
    return {
      success: false,
      message: "Error al cargar recibos",
      error: error.message,
    };
  }
}

module.exports = { CargaSimple };
