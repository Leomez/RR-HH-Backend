const {Empleado} = require("../../Config/db");
const { Tipo_de_solicitud } = require("../../Config/db");
const { Solicitud } = require("../../Config/db");
const { TraerSupervisores} = require("../Supervisor/TraerSupervisores")
const { crearNotificaciones } = require("./../Notificaciones/crearNotificaciones")


const formatDate = (date) => {
    const [day, month, year] = date.split('-');
    return `${day}/${month}/${year}`;
  };

async function crearSolicitudes(solicitud) {
    try {
        console.log(solicitud);
        const empleado = await Empleado.findByPk(solicitud.empleado_id);
        console.log(empleado.dataValues.sector_id, 'empleado/sectorId en crearSolicitudes');
        const supervisor = await TraerSupervisores(empleado.dataValues.sector_id);   
        console.log(supervisor, 'supervisor en crearSolicitudes');  

        const respuesta = await Solicitud.create({
            fecha: formatDate(solicitud.fecha),
            motivo: solicitud.motivo || null,
            estado: 'En proceso',
            fecha_desde: solicitud.fechaDesde !="" ? formatDate(solicitud.fechaDesde) : null,
            fecha_hasta: solicitud.fechaHasta !="" ? formatDate(solicitud.fechaHasta) : null,
            hora_ingreso: solicitud.horaIngreso || null,
            hora_salida: solicitud.horaSalida || null,
            fecha_permiso: solicitud.fechaPermiso !="" ? formatDate(solicitud.fechaPermiso) : null,
            dia_compensatorio: solicitud.fechaCompensatoria !="" ? formatDate(solicitud.fechaCompensatoria) : null,
            empleado_id: solicitud.empleado_id,
            supervisor_id: supervisor.data[0].id,
            tipo: solicitud.tipo_solicitud_id,
            diasSolicitados: solicitud.diasSolicitados,            
        });
        console.log(solicitud);

        await crearNotificaciones({
            empleado_id: solicitud.empleado_id,
            tipo: "solicitud",
            mensaje: `Tu solicitud de ${solicitud.categoria} ha sido enviada exitosamente`,
            fecha: new Date(),
            estado: "pending"
        })

        return {
            success: true,
            message: "Solicitud creada correctamente",
            data: respuesta,
            status: 200
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            error: error,
            status: 500
        }
    }

}

module.exports = {crearSolicitudes};