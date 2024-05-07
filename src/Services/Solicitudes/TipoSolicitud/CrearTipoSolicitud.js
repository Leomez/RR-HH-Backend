const {Tipo_de_solicitud} = require("../../../Config/db")

async function CrearTipoSolicitud({nombre, canti_dias, caracteristicas}) {
    try {
        const tipo_solicitud = await Tipo_de_solicitud.create({
            nombre,
            canti_dias: canti_dias || null, // Valor predeterminado para cantidad_de_dias
            caracteristicas: caracteristicas || null, // Valor predeterminado para caracteristicas
        })
        return {
            success: true,
            mensaje: 'Tipo de solicitud creado con exito',
            tipo_solicitud
        }
    } catch (error) {
        return {
            success: false,
            mensaje: 'Error al crear el tipo de solicitud',
            error: {
                codigo: error.codigo,
                mensaje: error.message
            }
        }
    }
}

module.exports = {CrearTipoSolicitud}
