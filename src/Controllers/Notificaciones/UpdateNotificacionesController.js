const { catchAsync } = require('../../Middleware/catchAsync')
const { updateNotificaciones } = require('../../Services/Notificaciones/updateNotificaciones')

async function updateNotificacionesController(req,res) {
    const { id } = req.params

    console.log('***',id, '***');
    const noti = await updateNotificaciones(id)
    if(noti.success) {
        res.status(200).json({
            success: noti.success,
            data: noti.data
        })
    } else {
        res.status(400).json({
            success: noti.success,
            message: noti.message,
            data: noti.data
        })
    }
}

module.exports = { updateNotificacionesController: catchAsync(updateNotificacionesController) }
