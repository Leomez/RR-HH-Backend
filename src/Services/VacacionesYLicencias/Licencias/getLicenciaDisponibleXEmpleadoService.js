const {Licencia_empleado} = require('../../../Config/db')

async function getLicenciaDisponibleXEmpleadoService(id) {
    try {
        const licencias = await Licencia_empleado.findAll({
            where: {
                empleado_id: id
            }
        })
        if (!licencias) {
            return {
                success: false,
                message: 'No se encontraron licencias para el empleado',
                error: 'Licencia no encontrada',
                status: 404
            }
        } else {
            return {
                success: true,
                message: 'Licencias encontradas',
                data: licencias,
                status: 200
            }
        }        
    } catch (error) {
        return {
            success: false,
            message: 'Error al obtener las licencias',
            error: error,
            status: 500
        }
    }
}

module.exports = { getLicenciaDisponibleXEmpleadoService }