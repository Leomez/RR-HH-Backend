const {get_tipos_vacaciones} = require('../../../Services/Tipos_de_licencia/Get_tipos_licencia')

async function getTipoVacaciones(req, res) {
    try {
        console.log('controlador getTipoVacaciones')
        const {id} = req.query
        const respuesta = await get_tipos_vacaciones(id)    
        if (respuesta.success) {
            res.status(200).json({
                success: true,
                data: respuesta.data,
                message: respuesta.message
            })
        } else {
            res.status(400).json({
                success: false,
                data: respuesta.data,
                message: respuesta.message
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message
        })
    }
}

module.exports = {
    getTipoVacaciones
}