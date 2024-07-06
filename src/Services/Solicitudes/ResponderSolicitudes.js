const { Solicitud } = require("../../Config/db")
const { actualizarDiasPendientes } = require('../VacacionesXEmpleado/VacacionesXEmpleado')
const { BuscarSolicitudes } = require('./Util/BuscarSolicitudes')
const { RenovarDiasPendientes } = require('../Tipos_de_licencia/RenovarDiasPendientes')


//responde solicitud por supervisor. Cambia estado de la solicitud a ELEVADO o RECHAZADO
async function ResponderSolicitudes(id, estado) {
    try {
        await Solicitud.update({ estado }, { where: { id } })
        const solicitudActualizada = await Solicitud.findByPk(id)
        const solicitud = solicitudActualizada.toJSON()

        return {
            success: true,
            message: "Solicitud respondida correctamente",
            data: { nuevoEstado: solicitud.estado }
        }
    } catch (error) {
        return {
            success: false,
            error: error,
            message: error.message
        }

    }

}

//autoriza solicitud por jefe RRHH. Cambia estado de la solicitud a AUTORIZADO y actualizo dias pendientes de vacaciones y licencias
async function AutorizarSolicitud(id, estado) {
    try {
        const solicitud = await BuscarSolicitudes({ id: id })
        const sol = solicitud[0].toJSON()
        console.log(sol);
        //autorizo las vacaciones
        if (sol && sol.tipo_solicitud.toLowerCase() === 'vacaciones') {
            // console.log(sol, estado); 
            // console.log(sol.empleado_id, ' ', sol.dias_solicitados);
            const actualizacion = await actualizarDiasPendientes(sol.empleado_id, sol.dias_solicitados)
            await Solicitud.update({ estado }, { where: { id } })
            if (!actualizacion.success) {
                return {
                    success: false,
                    error: actualizacion.error,
                    message: actualizacion.message
                }
            }
            return {
                success: true,
                message: "Solicitud autorizada correctamente",
                data: { nuevoEstado: estado }
            }
        }
        //autorizo la otras licencias
        if (sol && sol.tipo_solicitud.toLowerCase() === 'licencia') {
            // console.log(sol, estado); 
            // console.log(sol.empleado_id, ' ', sol.dias_solicitados);
            const actualizacion = await RenovarDiasPendientes(sol.empleado_id, sol.nombre_tipo_solicitud, sol.dias_solicitados)
            await Solicitud.update({ estado }, { where: { id } })
            if (!actualizacion.success) {
                return {
                    success: false,
                    error: actualizacion.error,
                    message: actualizacion.message
                }
            }
            return {
                success: true,
                message: "Solicitud autorizada correctamente",
                data: { nuevoEstado: estado }
            }
        }
        //autorizo los permisos
        if (sol && sol.tipo_solicitud.toLowerCase() === 'permiso') {
            await Solicitud.update({ estado }, { where: { id } })
            return {
                success: true,
                message: "Solicitud autorizada correctamente",
                data: { nuevoEstado: estado }
            }
        }
        return {
            success: false,
            message: "Solicitud no autorizada"
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error,
            message: error.message
        }
    }
}

module.exports = { ResponderSolicitudes, AutorizarSolicitud }