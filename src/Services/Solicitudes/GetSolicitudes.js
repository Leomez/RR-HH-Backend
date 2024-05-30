const { Solicitud, Empleado, Supervisor, Tipo_licencia, Tipo_permiso, Tipo_vacaciones, Vacaciones_empleado, Op } = require('../../Config/db');
const Sequelize = require('sequelize');


// Función para obtener las solicitudes

const getSolicitudes = async (empleado_id) => {
  try {    
    const supervisor = await Supervisor.findOne({
      where: {
        empleadoId: empleado_id
      }
    });

    const solicitudes = await Solicitud.findAll({
      where: {
        supervisor_id: supervisor.id
      },
      attributes: [
        'id',
        'fecha',
        'motivo',
        'estado',
        'fecha_desde',
        'fecha_hasta',
        'hora_ingreso',
        'hora_salida',
        'fecha_permiso',
        'dia_compensatorio',
        'dias_solicitados',
        'empleado_id',
        [Sequelize.literal(`CASE 
          WHEN Tipo_licencium.id IS NOT NULL THEN 'Licencia' 
          WHEN Tipo_permiso.id IS NOT NULL THEN 'Permiso' 
          WHEN Tipo_vacacione.id IS NOT NULL THEN 'Vacaciones' 
        END`), 'tipo_solicitud'],
        [Sequelize.fn('COALESCE', Sequelize.col('Tipo_licencium.nombre'), Sequelize.col('Tipo_permiso.nombre'), Sequelize.col('Tipo_vacacione.nombre')), 'nombre_tipo_solicitud'],
        [Sequelize.fn('COALESCE', Sequelize.col('Tipo_licencium.cantDias'), Sequelize.col('Tipo_vacacione.cantDias')), 'cant_dias']
      ],
      include: [
        {
          model: Tipo_licencia,
          as: 'Tipo_licencium',
          attributes: []
        },
        {
          model: Tipo_permiso,
          as: 'Tipo_permiso',
          attributes: []
        },
        {
          model: Tipo_vacaciones,
          as: 'Tipo_vacacione',
          attributes: []
        },
        {
          model: Empleado, as: 'empleado',
          as: 'empleado',
          attributes: ['nombre_empleado', 'apellido_empleado']
        }
      ],
      group: ['Solicitud.id'],      
      order: [['fecha', 'ASC']],

    });
    if (solicitudes.length > 0) {
      // console.log(solicitudes.map(solicitud => solicitud.toJSON().empleado), '<== solicitudes');
      const resultado = solicitudes.map(solicitud => {
        const sol = solicitud.toJSON()
        console.log(sol, '<== sol');
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
          empleado_id: sol.empleado_id
        }
      }
      );
      // console.log(resultado, '<== resultado');

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
};

module.exports = { getSolicitudes };



