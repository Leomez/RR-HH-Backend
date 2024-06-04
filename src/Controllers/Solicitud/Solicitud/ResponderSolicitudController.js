const { ResponderSolicitudes } = require('../../../Services/Solicitudes/ResponderSolicitudes')


async function responderSolicitudController(req, res) {
    try {        
        const { solicitudId } = req.params
        const { estado } = req.body
        const respuesta = await ResponderSolicitudes( solicitudId, estado )
        if (respuesta.success) {
            res.status(200).json({
                success: true,
                data: respuesta.data,
                message: respuesta.message
            })
        } else if (respuesta.error) {
            res.status(400).json({ 
                success: false,
                message: respuesta.message,
                error: respuesta.error
            })
        }        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })        
    }     
}

module.exports = {
    responderSolicitudController
}