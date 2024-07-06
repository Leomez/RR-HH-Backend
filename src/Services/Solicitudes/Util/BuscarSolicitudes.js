const { Solicitud, Tipo_licencia, Tipo_permiso, Tipo_vacaciones, Vacaciones_empleado, Licencia_empleado, Empleado, Sector } = require('../../../Config/db');
const { Sequelize } = require('sequelize');

const BuscarSolicitudes = async (where) => {
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
                [Sequelize.literal(`CASE 
                    WHEN Tipo_licencium.id IS NOT NULL THEN 'Licencia' 
                    WHEN Tipo_permiso.id IS NOT NULL THEN 'Permiso' 
                    WHEN Tipo_vacacione.id IS NOT NULL THEN 'Vacaciones' 
                END`), 'tipo_solicitud'],
                [
                    Sequelize.fn('COALESCE', 
                    Sequelize.col('Tipo_licencium.nombre'), 
                    Sequelize.col('Tipo_permiso.nombre'), 
                    Sequelize.col('Tipo_vacacione.nombre')), 
                    'nombre_tipo_solicitud'
                ],
                [
                    Sequelize.literal(`COALESCE(
                        (SELECT ve.dias_pendientes FROM vacaciones_empleado ve WHERE ve.empleado_id = empleado.id AND ve.tipo = Tipo_vacacione.nombre LIMIT 1),
                        (SELECT le.dias_pendientes FROM licencia_empleado le WHERE le.empleado_id = empleado.id AND le.tipo = Tipo_licencium.nombre LIMIT 1)
                    )`), 'dias_pendientes'
                ]
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
                    include: [
                        {
                            model: Sector,
                            attributes: ['nombre_sector']
                        }
                    ]
                }
            ],
            group: ['Solicitud.id', 'empleado.id', 'Tipo_licencium.id', 'Tipo_permiso.id', 'Tipo_vacacione.id'],
            order: [['fecha', 'ASC']],
        });

        return solicitudes;
    } catch (error) {
        console.error('Error al buscar solicitudes:', error);
        throw error;
    }
}

module.exports = { BuscarSolicitudes }

