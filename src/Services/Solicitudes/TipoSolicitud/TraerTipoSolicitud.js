const { Tipo_permiso, Tipo_licencia, Tipo_vacaciones } = require('../../../Config/db')
const { get_tipos_vacaciones } = require('../../Tipos_de_licencia/Get_tipos_licencia')

async function TraerTipoSolicitud(params) {
    try {
        const permiso = await Tipo_permiso.findAll()
        const licencia = await Tipo_licencia.findAll()
        // const vacaciones = await Tipo_vacaciones.findAll(params)
        const vacaciones = await get_tipos_vacaciones(params)
        const tipo_de_solicitud = { permiso, licencia, vacaciones }        
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