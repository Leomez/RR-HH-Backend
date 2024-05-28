const { Solicitud, Empleado, Tipo_de_solicitud, Vacaciones_empleado } = require('../../Config/db');


// Función para obtener las solicitudes

const getSolicitudes = async (superId) => {
  try {
    console.log(superId, '<== superId');

    const solicitudes = await Solicitud.findAll({
      where: {
        supervisor_id: superId
      },
      include: [
        {
          model: Empleado, as: 'empleado',
          attributes: ['nombre_empleado', 'apellido_empleado']
        },
        {
          model: Tipo_de_solicitud,
          attributes: ['nombre', 'canti_dias']
        },
        // {
        //   model: Vacaciones_empleado, as: 'vacaciones_empleado',
        //   attributes: ['dias_vacaciones']
        // }
      ],
      order: [['fecha', 'ASC']],

    });
    if (solicitudes.length > 0) {
      // console.log(solicitudes.map(solicitud => solicitud.toJSON().empleado), '<== solicitudes');
      const resultado = solicitudes.map(solicitud => {
        const sol = solicitud.toJSON()
        return {
          // ...sol, 
          id: sol.id,
          empleado: sol.empleado.nombre_empleado + ' ' + sol.empleado.apellido_empleado,
          tipo: sol.Tipo_de_solicitud.nombre,
          canti_dias: sol.Tipo_de_solicitud.canti_dias,
          fecha: sol.fecha,
          motivo: sol.motivo,
          estado: sol.estado,
          fecha_desde: sol.fecha_desde,
          fecha_hasta: sol.fecha_hasta,
          hora_ingreso: sol.hora_ingreso,
          hora_salida: sol.hora_salida,
          dia_compensatorio: sol.dia_compensatorio
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
      message: 'Error al obtener las solicitudes.',
      error: error
    }
  }
};

module.exports = { getSolicitudes };



