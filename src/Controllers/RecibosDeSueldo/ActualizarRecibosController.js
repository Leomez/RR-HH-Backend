const { ActualizarRecibo } = require('../../Services/Recibos_de_sueldo/ActualizarReciboFirmado')
async function ActualizarReciboFirmado(req, res) {
    const recibo = {
        id: req.body.id,
        archivo: req.file
    }
    try {
        const respuesta = await ActualizarRecibo(recibo)    
        if (!respuesta.success) {
            res.status(400).json({
                success: respuesta.success,
                message: respuesta.message,
                error: respuesta.error
            })
        } else {
            res.status(200).json({
                success: respuesta.success,
                message: respuesta.message
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

module.exports = { ActualizarReciboFirmado }