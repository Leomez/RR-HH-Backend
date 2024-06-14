const { Solicitud, Tipo_licencia, Tipo_permiso, Tipo_vacaciones, Empleado, Sector } = require('../../../Config/db');
const { Sequelize } = require('sequelize');



const BuscarSolicitudes = async (where) => {
    // console.log(where, '<== estoy buscando por where');
    try {
      const solicitudes = await Solicitud.findAll({
        where: where,
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
          // 'nombre_sector'
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
            model: Empleado,
            as: 'empleado',
            attributes: ['nombre_empleado', 'apellido_empleado'],
            include: {
              model: Sector,
              // as: 'id',            
              attributes: ['nombre_sector'] // Agregar el atributo 'nombre_sector'
            }
          }
        ],
        group: ['Solicitud.id'],
        order: [['fecha', 'ASC']],
  
      });

    // console.log(solicitudes, '<== estoy buscando por where');
    return solicitudes;

  } catch (error) {
    console.error('Error al buscar solicitudes:', error);
    throw error;
  }

}


module.exports = { BuscarSolicitudes }