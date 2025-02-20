const { Empleado, Usuario } = require('../../Config/db')

async function eliminarEmpleado(id) {
   
    try {

        const empleado = await Empleado.findByPk(id)
        const usuario = await Usuario.findOne({
            where: {
                EmpleadoId: id
            }
        })
        if (!empleado) {
            return {
                success: false,
                message: 'Empleado no encontrado',
                status: 404
            }
        } else {
            if (usuario) await usuario.destroy({ force: true })
            await empleado.destroy({ force: true })
            return {
                success: true,
                message: 'Empleado eliminado',
                status: 200
            }
        }

    } catch (error) {
        return {
            success: false,
            message: error.message,
            status: 500
        }
    }
}

module.exports = { eliminarEmpleado }