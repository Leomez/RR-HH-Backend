const { recibos_sin_firmar } = require("./recibos_sin_firmar");
const { cumpleanios } = require("./cumpleanios");
const { Notificaciones } = require("../../Config/db");
const { solicitudes } = require("./solicitudes");


async function ObtenerNotificaciones(id) {
  try {
    const notificaciones = [];
    const recibos = await recibos_sin_firmar(id);    
    const cumplesDelDia = await cumpleanios();
    const notificacionesEnLaBase = await Notificaciones.findAll({
      where: {
        empleado_id: id
      }
    })
    // console.log(notificacionesEnLaBase);
    
    if (recibos && recibos.length > 0) {      
      recibos.forEach((recibo) => {        
        notificaciones.push(recibo);
      });
    }

    if (cumplesDelDia && cumplesDelDia.length > 0) {
      cumplesDelDia.forEach((cumple) => {
        notificaciones.push(cumple);
      })
    }

    if (notificacionesEnLaBase && notificacionesEnLaBase.length > 0) {
      notificacionesEnLaBase.forEach((notificacion) => {
        notificaciones.push({
          id: notificacion.id,
          tag: notificacion.tipo,
          titulo: notificacion.tipo,
          contenido: notificacion.mensaje,
          fecha: new Date(notificacion.fecha).toLocaleDateString("es-AR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          estado: notificacion.estado,
          accion: notificacion.estado ? "pending": "Ver mas",
        });
      })
    }


    // if (cumplesDelDia) {     
    //   notificaciones.push(cumplesDelDia);     
    // }    
    return {
      success: true,
      data: notificaciones
    };
    
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    throw new Error({
      success: false,
      data: error,
      message: error.message
    });       
  }
}

module.exports = { ObtenerNotificaciones };

