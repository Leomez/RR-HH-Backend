const { Tipo_de_solicitud } = require('../../../Config/db')

async function TraerTipoSolicitud(params) {
    try {
        const tipo_de_solicitud = await Tipo_de_solicitud.findAll(params)
        return {
            success: true,
            message: 'Tipo de solicitud encontrado',
            data: tipo_de_solicitud
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error al encontrar el tipo de solicitud: ' + error.message,
            error: error
        }    
    }        
}

module.exports = { TraerTipoSolicitud }