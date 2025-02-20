const { Notificaciones } = require('../../Config/db')


async function updateNotificaciones(id) {
    try {
        const noti = await Notificaciones.findByPk(id)
        if (!noti) {
            return {
                success: false,
                data: 'Notificacion no encontrada'
            }
        }
        await noti.update({
            estado: "read"
        },{where: {id: id}})
        return {
            success: true,
            data: 'Notificacion actualizada'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            error: error
        }
    }
}

module.exports = { updateNotificaciones }
