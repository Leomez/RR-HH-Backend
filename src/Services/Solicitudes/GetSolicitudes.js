const { Solicitud, Empleado, Supervisor, Tipo_licencia, Tipo_permiso, Tipo_vacaciones, Sector, Vacaciones_empleado, Op } = require('../../Config/db');
const { BuscarSolicitudes } = require('./Util/BuscarSolicitudes')
const Sequelize = require('sequelize');

const usePostgresBackup = process.env.USE_PG_BACKUP === 'true' || process.env.USE_PG_URL === 'true';


//busca todas las solicitudes en la base
const getAllSolicitudes = async () => {
  try {
    const solicitudes = await BuscarSolicitudes();
    if (solicitudes.length > 0) {
      const resultado = solicitudes.map(solicitud => {
        const sol = solicitud.toJSON()
        return {
          id: sol.id,
          empleado: sol.empleado.nombre_empleado + ' ' + sol.empleado.apellido_empleado,
          tipo: sol.tipo_solicitud,
          nombre_tipo: sol.nombre_tipo_solicitud,
          cant_dias: sol.dias_pendientes,
          // fecha: sol.fecha,
          // motivo: sol.motivo,
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
      // console.log(solicitudes, '<== solicitudes en getAllSolicitudes')
      return {
        success:true,
        message: 'Solicitudes obtenidas exitosamente.',
        data: resultado,
        status: 200
      }
    } else {
      // console.log('No hay solicitudes');
      return {
        success:false,
        message: 'No hay solicitudes.',
        data: [],
        status: 404
      }
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.message,
      error: error,
      status: 500
    }
  }
}


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
        message: 'Solicitudes obtenidas exitosamente.',
        status: 200
      }
    } else {
      return {
        success: false,
        data: [],
        message: 'No hay solicitudes.',
        status: 404
      }
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: `Error al obtener las solicitudes: ${error.message}`,
      error: error,
      status: 500
    }
  }
}

//trae todas la solicitudes de un sector
const getSolicitudes = async (empleado_id) => {
  try {
    const empleadoId = usePostgresBackup ? "EmpleadoId" : "empleadoId";
    const supervisor = await Supervisor.findOne({
      where: {
        empleadoId : empleado_id
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
        }
      });

      return {
        success: true,
        data: resultado,
        message: 'Solicitudes obtenidas exitosamente.',
        status: 200
      }
    } else {
      return {
        success: false,
        data: [],
        message: 'No hay solicitudes.',
        status: 404
      }
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: `Error al obtener las solicitudes: ${error.message}`,
      error: error,
      status: 500
    }
  }
}


//busca todas las solicitudes elevadas a RRHH
const getSolicitudesElevadas = async () => {
  try {
    // console.log(`estoy en getSolicitudesElevadas`);
    const solicitudes = await BuscarSolicitudes({ estado: 'Elevado' })    

    if (solicitudes.length > 0) {
      const resultado = solicitudes.map(solicitud => {
        const sol = solicitud.toJSON()        
        // console.log(sol, '<== estoy en getSolicitudesElevadas');

        return {
          id: sol.id,
          empleado: sol.empleado.nombre_empleado + ' ' + sol.empleado.apellido_empleado,
          tipo: sol.tipo_solicitud,
          nombre_tipo: sol.nombre_tipo_solicitud,
          cant_dias: sol.dias_pendientes,
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
      // console.log(resultado, '<== resultado en getSolicitudesElevadas');
      
      return {
        success: true,
        data: resultado,
        message: 'Solicitudes elevadas obtenidas exitosamente.',
        status: 200
      }
    } else {
      // console.log('No hay solicitudes elevadas');
      return {
        success: false,
        data: [],
        message: 'No hay solicitudes elevadas.',
        status: 404
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `Error al obtener las solicitudes elevadas: ${error.message}`,
      error: error,
      status: 500
    }
  }
}



module.exports = { getSolicitudes, getSolicitudesElevadas, getSolicitudesXEmpleado, getAllSolicitudes };



