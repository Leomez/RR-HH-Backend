const { Notificaciones }  = require('../../Config/db')

async function deleteNotificaciones(id) {
 try {
    const noti = await Notificaciones.findByPk(id)
    if (!noti) {
        return {
            success: false,
            data: 'Notificacion no encontrada'
        }
    } else {
        await Notificaciones.destroy({where: {id}})
        return {
            success: true,
            data: 'Notificacion eliminada'
        }
    }
 } catch (error) {
     console.error("Error al eliminar la notificación:", error);
    return {
        success: false,
        data: error,
        message: error.message
    }    
 }   
}

module.exports = { deleteNotificaciones }