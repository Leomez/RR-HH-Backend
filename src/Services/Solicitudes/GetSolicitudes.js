const { Solicitud, Empleado, Supervisor, Tipo_licencia, Tipo_permiso, Tipo_vacaciones, Sector, Vacaciones_empleado, Op } = require('../../Config/db');
const { BuscarSolicitudes } = require('./Util/BuscarSolicitudes')
const Sequelize = require('sequelize');


//busca todas las solicitudes de un empleado
const getSolicitudesXEmpleado = async (empleado_id) => {
  try {
    const solicitudes = await BuscarSolicitudes({ empleado_id: empleado_id });
    if (solicitudes.length > 0) {
      const resultado = solicitudes.map(solicitud => {
        const sol = solicitud.toJSON()

        return {
          id: sol.id,
          tipo: sol.tipo_solicitud,
          nombre_tipo: sol.nombre_tipo_solicitud,
          cant_dias: sol.cant_dias,
          fecha: sol.fecha,
          motivo: sol.motivo,
          estado: sol.estado,
          fecha_permiso: sol.fecha_permiso,
          fecha_desde: sol.fecha_desde,
          fecha_hasta: sol.fecha_hasta,
          hora_ingreso: sol.hora_ingreso,
          hora_salida: sol.hora_salida,
          dia_compensatorio: sol.dia_compensatorio,
          dias_solicitados: sol.dias_solicitados,
        }
      })

      return {
        success: true,
        data: resultado,
        message: 'Solicitudes obtenidas exitosamente.'
      }
    } else {
      return {
        success: false,
        data: [],
        message: 'No hay solicitudes.'
      }
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: `Error al obtener las solicitudes: ${error.message}`,
      error: error
    }
  }

}

//trae todas la solicitudes de un sector
const getSolicitudes = async (empleado_id) => {
  try {
    const supervisor = await Supervisor.findOne({
      where: {
        empleadoId: empleado_id
      }
    });

    const solicitudes = await BuscarSolicitudes({ supervisor_id: supervisor.id });
    if (solicitudes.length > 0) {
      const resultado = solicitudes.map(solicitud => {
        const sol = solicitud.toJSON()

        return {
          // ...sol, 
          id: sol.id,
          empleado: sol.empleado.nombre_empleado + ' ' + sol.empleado.apellido_empleado,
          tipo: sol.tipo_solicitud,
          nombre_tipo: sol.nombre_tipo_solicitud,
          cant_dias: sol.cant_dias,
          fecha: sol.fecha,
          motivo: sol.motivo,
          estado: sol.estado,
          fecha_permiso: sol.fecha_permiso,
          fecha_desde: sol.fecha_desde,
          fecha_hasta: sol.fecha_hasta,
          hora_ingreso: sol.hora_ingreso,
          hora_salida: sol.hora_salida,
          dia_compensatorio: sol.dia_compensatorio,
          dias_solicitados: sol.dias_solicitados,
          empleado_id: sol.empleado_id,
          // sector: sol.empleado.sector.nombre_sector
        }
      });

      return {
        success: true,
        data: resultado,
        message: 'Solicitudes obtenidas exitosamente.'
      }
    } else {
      return {
        success: false,
        data: [],
        message: 'No hay solicitudes.'
      }
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: `Error al obtener las solicitudes: ${error.message}`,
      error: error
    }
  }
}


//busca todas las solicitudes elevadas a RRHH
const getSolicitudesElevadas = async () => {
  try {
    const solicitudes = await BuscarSolicitudes({ estado: 'Elevado' })
    // console.log(solicitudes.length, '<== estoy getSolicitudesElevadas');

    if (solicitudes.length > 0) {
      const resultado = solicitudes.map(solicitud => {
        const sol = solicitud.toJSON()
        // const sector = sol.empleado.Sector.nombre_sector;
        // console.log(sector, '<== ese es el sector');

        return {
          id: sol.id,
          empleado: sol.empleado.nombre_empleado + ' ' + sol.empleado.apellido_empleado,
          tipo: sol.tipo_solicitud,
          nombre_tipo: sol.nombre_tipo_solicitud,
          cant_dias: sol.cant_dias,
          fecha: sol.fecha,
          motivo: sol.motivo,
          estado: sol.estado,
          fecha_permiso: sol.fecha_permiso,
          fecha_desde: sol.fecha_desde,
          fecha_hasta: sol.fecha_hasta,
          hora_ingreso: sol.hora_ingreso,
          hora_salida: sol.hora_salida,
          dia_compensatorio: sol.dia_compensatorio,
          dias_solicitados: sol.dias_solicitados,
          empleado_id: sol.empleado_id,
          sector: sol.empleado.Sector.nombre_sector
        }
      })
      // console.log(resultado);
      return {
        success: true,
        data: resultado,
        message: 'Solicitudes elevadas obtenidas exitosamente.'
      }
    } else {
      return {
        success: false,
        data: [],
        message: 'No hay solicitudes elevadas.'
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `Error al obtener las solicitudes elevadas: ${error.message}`,
      error: error
    }
  }
}



module.exports = { getSolicitudes, getSolicitudesElevadas, getSolicitudesXEmpleado };



