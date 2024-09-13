const { Empleado, Asistencia } = require('../../Config/db')

async function RegistrarIngreso(empleadoId) {
    const getTodayDate = () => new Date().toISOString().split('T')[0];
    const getCurrentTime = () => new Date().toTimeString().split(' ')[0]; // Formato HH:mm:ss
    try {
        const fecha = getTodayDate();
        const hora_ingreso = getCurrentTime();

        const [asistencia, created] = await Asistencia.findOrCreate({
            where: {
                EmpleadoId: empleadoId,
                fecha: fecha
            },
            defaults: { hora_ingreso }
        });

        if (!created) {
            asistencia.hora_ingreso = hora_ingreso;
            await asistencia.save();
        }

        return {
            success: true,
            data: asistencia.hora_ingreso,
            message: 'Ingreso registrado correctamente',
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

async function RegistrarSalida(empleadoId) {
    const getTodayDate = () => new Date().toISOString().split('T')[0];
    const getCurrentTime = () => new Date().toTimeString().split(' ')[0];
    try {
        const fecha = getTodayDate();
        const hora_salida = getCurrentTime();
        const asistencia = await Asistencia.findOne({
            where: {
                EmpleadoId: empleadoId,
                fecha: fecha
            }
        });

        if (asistencia) {
            asistencia.hora_salida = hora_salida;
            await asistencia.save();
            return {
                success: true,
                data: asistencia.hora_salida,
                message: 'Salida registrada correctamente',
                status: 200
            }
        } else {
            return {
                success: false,
                data: null,
                message: 'Fichada de ingreso no registrada para el dia de hoy',
                status: 404
            }
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

async function RegistrarInicioDePausa(empleadoId) {
    const getTodayDate = () => new Date().toISOString().split('T')[0];
    const getCurrentTime = () => new Date().toTimeString().split(' ')[0];
    const fecha = getTodayDate();
    const hora_pausa_comer = getCurrentTime();

    try {
        const asistencia = await Asistencia.findOne({
            where: {
                EmpleadoId: empleadoId,
                fecha: fecha
            }
        });
        if (asistencia) {
            asistencia.hora_pausa_comer = hora_pausa_comer;
            await asistencia.save();
            return {
                success: true,
                data: asistencia.hora_pausa_comer,
                message: 'Inicio de pausa registrada correctamente',
                status: 200
            }
        } else {
            return {
                success: false,
                data: null,
                message: 'Fichada de ingreso no registrada para el dia de hoy',
                status: 404
            }
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

async function RegistrarFinDePausa(empleadoId) {
    const getTodayDate = () => new Date().toISOString().split('T')[0];
    const getCurrentTime = () => new Date().toTimeString().split(' ')[0];
    const fecha = getTodayDate();
    const hora_regreso_pausa = getCurrentTime();

    try {
        const asistencia = await Asistencia.findOne({
            where: {
                EmpleadoId: empleadoId,
                fecha: fecha
            }
        });
        if (asistencia) {
            asistencia.hora_regreso_pausa_comer = hora_regreso_pausa;
            await asistencia.save();
            return {
                success: true,
                data: asistencia.hora_regreso_pausa,
                message: 'Fin de pausa registrada correctamente',
                status: 200
            }
        } else {
            return {
                success: false,
                data: null,
                message: 'Fichada de ingreso no registrada para el dia de hoy',
                status: 404
            }
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

async function GetRegistro(empleadoId) {
    const getTodayDate = () => new Date().toISOString().split('T')[0];
    const fecha = getTodayDate();
    try {
        const asistencia = await Asistencia.findOne({
            where: {
                EmpleadoId: empleadoId,
                fecha: fecha
            }
        });
        if (asistencia) {
            return {
                success: true,
                data: {
                    ingreso: asistencia.hora_ingreso,
                    salida: asistencia.hora_salida,
                    pausa: asistencia.hora_pausa_comer,
                    finDePausa: asistencia.hora_regreso_pausa
                },
                message: 'Registro encontrado',
                status: 200
            }
        } else {
            return {
                success: false,
                data: null,
                message: 'Registro no encontrado',
                status: 404
            }
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

module.exports = {
    RegistrarIngreso,
    RegistrarSalida,
    RegistrarInicioDePausa,
    RegistrarFinDePausa,
    GetRegistro
}