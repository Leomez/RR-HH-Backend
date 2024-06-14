const { Licencia_empleado, Tipo_licencia } = require('../../Config/db');



async function RenovarDiasPendientes(id_empleado, nombre_tipo_solicitud, diasSolicitados) {

    try {
        // Obtener la fecha actual
        const hoy = new Date();
        const mesActual = hoy.getMonth() + 1; // getMonth() retorna 0 para enero, por lo que sumamos 1
        const diaActual = hoy.getDate();
        const añoActual = hoy.getFullYear();

        //obtener la licencia especifica
        const licencia = await Licencia_empleado.findOne({
            where: {
                id_empleado: id_empleado,
                tipo: nombre_tipo_solicitud,
            }
        })

        const tipoLicencia = await Tipo_licencia.findOne({
            where: {
                nombre: nombre_tipo_solicitud
            }
        })

        if (!licencia) {
            return {
                success: false,
                message: 'No se encontraron datos de licencia para el empleado'
            };
        }

        if (!tipoVacaciones) {
            return {
                success: false,
                message: 'No se pudo determinar el tipo de vacaciones para el empleado'
            };
        }

        // Comprobar si la última renovación no fue en el año actual y es después del 1 de noviembre
        const ultimaRenovacion = licencia.ultima_renovacion ? new Date(licencia.ultima_renovacion) : null;
        if (!ultimaRenovacion || ultimaRenovacion.getFullYear() < añoActual) {
            if (mesActual > 1 || (mesActual === 1 && diaActual >= 1)) {
                // Renovar los días pendientes
                licencia.dias_pendientes = tipoLicencia.cantDias;
                licencia.ultima_renovacion = hoy;
            }
        }

        // Restar los días solicitados a los días pendientes
        const diasActualizados = licencia.dias_pendientes - diasSolicitados;
        if (diasActualizados < 0) {
            return {
                success: false,
                message: 'El empleado no tiene suficientes días pendientes'
            };
        }

        // Actualizar los días pendientes y el tipo de vacaciones
        await licencia.update({
            dias_pendientes: diasActualizados,
            tipo: tipoLicencia.nombre,
            ultima_renovacion: licencia.ultima_renovacion
        });

        return {
            success: true,
            data: licencia,
            message: 'Días pendientes actualizados'
        };

    } catch (error) {
        console.error('Error al renovar días pendientes:', error);
        return {
            success: false,
            message: 'Error al renovar días pendientes'
        };
    }


}


module.exports = { RenovarDiasPendientes };