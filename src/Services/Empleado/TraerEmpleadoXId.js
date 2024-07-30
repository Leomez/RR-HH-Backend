const { Op } = require("sequelize");
const { Empleado } = require("../../Config/db");

async function TraerEmpleadoXId(EmpleadoId)  {
    try {
        console.log("EmpleadoId",EmpleadoId);
        const empleado = Empleado.findByPk(EmpleadoId);
        if (empleado) {
            return {
                success: true,
                mensaje: 'Empleado encontrado',
                data: empleado,
                status: 200
            }
        } else {
            return {
                success: false,
                mensaje: "Empleado no encontrado",
                data: empleado,
                status: 404
            };
        }
    } catch (error) {
        return {
            success: false,
            mensaje: 'Error al buscar el empleado',
            error: error.message,
            status: 500
        };
    }
}

module.exports = {
    TraerEmpleadoXId
};