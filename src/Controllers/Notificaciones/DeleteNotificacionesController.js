const { deleteNotificaciones } = require("../../Services/Notificaciones/deleteNotificaciones");
const { catchAsync } = require('../../Middleware/catchAsync')

async function deleteNotificacionesController(req, res){
    console.log('estoy en el controller de eliminar notificaciones');
    const id = req.params.id
    console.log(id);
    const NotificacionEliminada = await deleteNotificaciones(id)
    if (!NotificacionEliminada.success) {
        res.status(400).json({
            success: NotificacionEliminada.success,
            message: NotificacionEliminada.message,
            data: NotificacionEliminada.data
        })
    } else {
        res.status(200).json({
            success: NotificacionEliminada.success,
            data: NotificacionEliminada.data
        })
    }
}

module.exports = { deleteNotificacionesController: catchAsync(deleteNotificacionesController) }
