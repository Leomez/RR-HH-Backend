const { Solicitud } = require("../../Config/db")
const { actualizarDiasPendientes } = require('../VacacionesXEmpleado/VacacionesXEmpleado')
const { BuscarSolicitudes } = require('./Util/BuscarSolicitudes')
const { RenovarDiasPendientes } = require('../Tipos_de_licencia/RenovarDiasPendientes')
const { crearNotificaciones } = require('../Notificaciones/crearNotificaciones')




//responde solicitud por supervisor. Cambia estado de la solicitud a ELEVADO o RECHAZADO
async function ResponderSolicitudes(id, estado) {
    try {
        await Solicitud.update({ estado }, { where: { id } })
        const solicitudActualizada = await Solicitud.findByPk(id, { include: [{ all: true }] })
        const solicitud = solicitudActualizada.toJSON()
        console.log(solicitud, 'en ResponderSolicitudes linea 16')

        let nombre_tipo_solicitud = null

        if (solicitud.Tipo_licencium) {
            nombre_tipo_solicitud = solicitud.Tipo_licencium.nombre
        } else if (solicitud.Tipo_permiso) {
            nombre_tipo_solicitud = solicitud.Tipo_permiso.nombre
        } else if (solicitud.Tipo_vacacione) {
            nombre_tipo_solicitud = solicitud.Tipo_vacacione.nombre
        }
        console.log(nombre_tipo_solicitud, ' nombre_tipo_solicitud ***');
        await crearNotificaciones({
            empleado_id: solicitud.empleado_id,
            tipo: "Estado de Solicitud",
            mensaje: `Tu solicitud de ${isNaN(nombre_tipo_solicitud) ? nombre_tipo_solicitud : 'vacaciones'} ha sido ${estado}`,
            fecha: new Date(),
            estado: "pending"
        })

        return {
            success: true,
            message: "Solicitud respondida correctamente",
            data: { nuevoEstado: solicitud.estado },
            status: 200
        }
    } catch (error) {
        return {
            success: false,
            error: error,
            message: error.message,
            status: 500
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
                    message: actualizacion.message,
                    status: 500
                }
            }
            return {
                success: true,
                message: "Solicitud autorizada correctamente",
                data: { nuevoEstado: estado },
                status: 200
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
                    message: actualizacion.message,
                    status: 500
                }
            }
            return {
                success: true,
                message: "Solicitud autorizada correctamente",
                data: { nuevoEstado: estado },
                status: 200
            }
        }
        //autorizo los permisos
        if (sol && sol.tipo_solicitud.toLowerCase() === 'permiso') {
            await Solicitud.update({ estado }, { where: { id } })
            return {
                success: true,
                message: "Solicitud autorizada correctamente",
                data: { nuevoEstado: estado },
                status: 200
            }
        }
        return {
            success: false,
            message: "Solicitud no autorizada",
            status: 400
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error,
            message: error.message,
            status: 500
        }
    }
}

module.exports = { ResponderSolicitudes, AutorizarSolicitud }