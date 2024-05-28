const { getSolicitudes } = require('../../../Services/Solicitudes/GetSolicitudes')

async function getSolicitudController(req, res) {
    const { id } = req.query
    // console.log(req)
    try {
        const respuesta = await getSolicitudes(id)
        if (respuesta.success) {
            return res.status(200).json({
                success: true,
                data: respuesta.data
            })
        } else {
            return res.status(400).json({
                success: false,
                message: respuesta.message,
                error: respuesta.error

            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { getSolicitudController }