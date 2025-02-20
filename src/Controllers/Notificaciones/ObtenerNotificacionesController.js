const { ObtenerNotificaciones } = require('../../Services/Notificaciones/ObtenerNotificaciones')
const { catchAsync } = require('../../Middleware/catchAsync')


async function obtenerNotificaciones(req, res) {

    const { id } = req.params
    const notificaciones = await ObtenerNotificaciones(id)
    if (!notificaciones.success) {
        res.status(400).json({
            success: notificaciones.success,
            message: notificaciones.message,
            data: notificaciones.data
        })
    } else {
        res.status(200).json({
            success: notificaciones.success,
            data: notificaciones.data
        })
    }

}

module.exports = { obtenerNotificaciones: catchAsync(obtenerNotificaciones) }