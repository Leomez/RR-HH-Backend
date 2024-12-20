const {Empleado, Vacaciones_empleado, Tipo_vacaciones, Op } = require('../../Config/db')
const {get_tipos_vacaciones} = require('../Tipos_de_licencia/Get_tipos_licencia')
const { BuscarSolicitudes } = require('../Solicitudes/Util/BuscarSolicitudes')


//uso esta funcion para crear una instancia de la tabla Vacaciones_empleado que sirve para tener un regitro 
//de los dias pendientes de vacaciones por cada empleado.
//la tabla debe actualizarse cuando se apruebe una solicitud de vacaciones con la cantidad de dias solicitados en la 
//ocacion
async function VacacionesXEmpleado(id) {
    
    try {
        const tipoVacaciones = await get_tipos_vacaciones(id)
        //me da la cantidad de dias que le corresponden segun el tipo
        const diasTotales = tipoVacaciones.cantDias
        //me da el nombre del tipo de vacacionse: (1,2,3,4,5)
        const tipo = tipoVacaciones.nombre
    
        const vacaciones = await Vacaciones_empleado.create({
            empleado_id: id, 
            tipo: tipo,        
            dias_pendientes: diasTotales,        
        })
        return {
            success: true,
            data: vacaciones,
            message: 'Instancia de vacaciones creada'
        }    
    } catch (error) {
        return {
            success: false,
            message: error.message,
            error: error
        }        
    }
}


//actualizo los dias pendientes de vacaciones cada vez que las goza.
async function actualizarDiasPendientes(id, diasSolicitados) {
    try {
        // Obtener la fecha actual
        const hoy = new Date();
        const mesActual = hoy.getMonth() + 1; // getMonth() retorna 0 para enero, por lo que sumamos 1
        const diaActual = hoy.getDate();
        const añoActual = hoy.getFullYear();

        // Obtener las vacaciones del empleado
        const vacaciones = await Vacaciones_empleado.findOne({
            where: {
                empleado_id: id
            }
        });

        if (!vacaciones) {
            return {
                success: false,
                message: 'No se encontraron datos de vacaciones para el empleado'
            };
        }

        // Obtener el tipo de vacaciones basado en la antigüedad del empleado
        const tipoVacaciones = await get_tipos_vacaciones(id);

        if (!tipoVacaciones) {
            return {
                success: false,
                message: 'No se pudo determinar el tipo de vacaciones para el empleado'
            };
        }

        // Comprobar si la última renovación no fue en el año actual y es después del 1 de noviembre
        const ultimaRenovacion = vacaciones.ultima_renovacion ? new Date(vacaciones.ultima_renovacion) : null;
        if (!ultimaRenovacion || ultimaRenovacion.getFullYear() < añoActual) {
            if (mesActual > 11 || (mesActual === 11 && diaActual >= 1)) {
                // Renovar los días pendientes
                vacaciones.dias_pendientes = tipoVacaciones.cantDias;
                vacaciones.ultima_renovacion = hoy;
            }
        }

        // Restar los días solicitados a los días pendientes
        const diasActualizados = vacaciones.dias_pendientes - diasSolicitados;
        if (diasActualizados < 0) {
            return {
                success: false,
                message: 'El empleado no tiene suficientes días pendientes'
            };
        }

        // Actualizar los días pendientes y el tipo de vacaciones
        await vacaciones.update({
            dias_pendientes: diasActualizados,
            tipo: tipoVacaciones.nombre,
            ultima_renovacion: vacaciones.ultima_renovacion
        });

        return {
            success: true,
            data: vacaciones,
            message: 'Días pendientes actualizados'
        };

    } catch (error) {
        return {
            success: false,
            message: error.message,
            error: error
        };
    }
}

const getDiasPendientes = async (id) => {
    try {
        const vacaciones = await Vacaciones_empleado.findOne({
            where: {
                empleado_id: id
            }
        });

        if (!vacaciones) {
            return {
                status: 404,
                success: false,
                message: 'No se encontraron datos de vacaciones para el empleado'
            };
        }

        return {
            status: 200,
            success: true,
            data: vacaciones.dias_pendientes
        };

    } catch (error) {
        return {
            success: false,
            message: error.message,
            error: error,
            status: 500
        };
    }
}
module.exports = {VacacionesXEmpleado, actualizarDiasPendientes, getDiasPendientes}

