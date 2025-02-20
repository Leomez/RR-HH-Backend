const { TraerDomicilio } = require('../../Services/Domicilio/TraerDomicilio')


async function TraerDomicilios(req, res) {
    try {
        const result = await TraerDomicilio()
        if (result.success) {
            res.status(result.status).json({
                data: result.data,
                message: result.message
            })            
        } else {
            res.status(result.status).json({
                data: result.data,
                message: result.message
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error en el sevidor'
        })
    }
}

module.exports = {
    TraerDomicilios
}