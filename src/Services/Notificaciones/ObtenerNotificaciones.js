const { recibos_sin_firmar } = require("./recibos_sin_firmar");
const { cumpleanios } = require("./cumpleanios");


async function ObtenerNotificaciones(id) {
  try {
    const notificaciones = [];
    const data = await recibos_sin_firmar(id);    
    const cumplesDelDia = await cumpleanios();
    
    if (data && data.length > 0) {      
      data.forEach((recibo) => {        
        notificaciones.push(recibo);
      });
    }

    if (cumplesDelDia && cumplesDelDia.length > 0) {
      cumplesDelDia.forEach((cumple) => {
        notificaciones.push(cumple);
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
    return {
      success: false,
      data: error,
      message: error.message
    }    
  }
}

module.exports = { ObtenerNotificaciones };

