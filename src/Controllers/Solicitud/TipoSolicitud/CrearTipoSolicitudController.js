const { CrearTipoSolicitud } = require("../../../Services/Solicitudes/TipoSolicitud/CrearTipoSolicitud");

// Crear tipo solicitud
const crearTipoSolicitud = async (req, res) => {
  console.log(req.body);
  const { nombre, caracteristicas } = req.body;
  try {
    const respuesta = await CrearTipoSolicitud({ nombre, caracteristicas });
    if (!respuesta.success) {
      res.status(respuesta.status).json({
        success: respuesta.success,
        message: respuesta.mensaje,
        error: respuesta.error
      });
    } else {
      res.status(respuesta.status).json({
        success: respuesta.success,
        message: respuesta.mensaje,
        tipo_solicitud: respuesta.tipo_solicitud
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en el servidor: " + error.message
    });
  }
};


module.exports = { crearTipoSolicitud };

