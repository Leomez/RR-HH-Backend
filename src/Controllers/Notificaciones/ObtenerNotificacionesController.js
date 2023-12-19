const { ObtenerNotificaciones } = require('../../Services/Notificaciones/ObtenerNotificaciones')

async function obtenerNotificaciones(req, res) {
    try {
        const { id } = req.params
        const notificaciones = await ObtenerNotificaciones(id)
        if (!notificaciones.success){
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })        
    }
}

module.exports = { obtenerNotificaciones }