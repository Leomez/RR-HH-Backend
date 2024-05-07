const { TraerTipoSolicitud } = require('../../../Services/Solicitudes/TipoSolicitud/TraerTipoSolicitud')

// Traer tipo solicitud
const traerTipoSolicitud = async (req, res) => {
    try {
        const respuesta = await TraerTipoSolicitud();
        if (!respuesta.success) {
            res.status(400).json({
                success: false,
                message: respuesta.message,
                error: respuesta.error
            });
        } else {
            res.status(200).json({
                success: respuesta.success,
                message: respuesta.message,
                data: respuesta.data
            });
        }
    } catch {
        res.status(500).json({
            success: false,
            message: "Error en el servidor: " + error.message
        })
    }
}

module.exports = { traerTipoSolicitud }