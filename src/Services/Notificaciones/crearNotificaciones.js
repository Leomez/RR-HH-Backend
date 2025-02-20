
const { Notificaciones } = require("../../Config/db");

async function crearNotificaciones(data) {
  try {
    const nuevaNotificacion = await Notificaciones.create(data);
    return {
      success: true,
      data: nuevaNotificacion,
    };
  } catch (error) {
    console.error("Error al crear la notificación:", error);
    throw new Error({
      success: false,
      data: error,
      message: error.message,
    });
  }
}

module.exports = { crearNotificaciones };