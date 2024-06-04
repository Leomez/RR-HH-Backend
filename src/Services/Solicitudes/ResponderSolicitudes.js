const { Solicitud } = require("../../Config/db")

async function ResponderSolicitudes(id, estado) {
    try {
        await Solicitud.update({ estado }, { where: { id } })
        const solicitudActualizada = await Solicitud.findByPk(id)
        const solicitud = solicitudActualizada.toJSON()
        
        return {
            success: true,
            message: "Solicitud respondida correctamente",
            data: {nuevoEstado: solicitud.estado}
        }
    } catch (error) {
        return {
            success: false,
            error: error,
            message: error.message
        }
        
    } 
    
}

module.exports = { ResponderSolicitudes }