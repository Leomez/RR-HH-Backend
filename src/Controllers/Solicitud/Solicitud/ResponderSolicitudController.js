const { ResponderSolicitudes, AutorizarSolicitud } = require('../../../Services/Solicitudes/ResponderSolicitudes');

async function responderSolicitudController(req, res) {
    try {
        const { solicitudId } = req.params;
        const { estado } = req.body;
        let respuesta = {};

        if (estado === undefined || estado === null) {
            respuesta = {
                success: false,
                error: 'El estado es requerido',
                message: 'El estado es requerido',
                status: 400
            };
        } else if (estado === 'Elevado' || estado === 'Rechazado') {
            respuesta = await ResponderSolicitudes(solicitudId, estado);
        } else if (estado === 'Aprobado') {
            respuesta = await AutorizarSolicitud(solicitudId, estado);
        }

        if (respuesta.success) {
            res.status(respuesta.status).json({
                success: true,
                data: respuesta.data,
                message: respuesta.message
            });
        } else {
            res.status(respuesta.status).json({
                success: false,
                message: respuesta.message || 'Error desconocido',
                error: respuesta.error || 'Error desconocido'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

module.exports = {
    responderSolicitudController
};
