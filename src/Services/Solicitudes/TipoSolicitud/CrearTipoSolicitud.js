const {Tipo_de_solicitud} = require("../../../Config/db")

async function CrearTipoSolicitud({nombre, caracteristicas}) {
    try {
        const tipo_solicitud = await Tipo_de_solicitud.create({
            nombre,            
            caracteristicas: caracteristicas || null, // Valor predeterminado para caracteristicas
        })
        return {
            success: true,
            mensaje: 'Tipo de solicitud creado con exito',
            tipo_solicitud,
            status: 200
        }
    } catch (error) {
        return {
            success: false,
            mensaje: 'Error al crear el tipo de solicitud',
            error: {
                codigo: error.codigo,
                mensaje: error.message
            },
            status: 500
        }
    }
}

module.exports = {CrearTipoSolicitud}
