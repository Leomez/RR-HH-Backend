const { eliminarEmpleado } = require('../../Services/Empleado/EliminarEmpleado')


async function EliminarEmpleado(req, res) {
    const { id } = req.body
    try {
        const result = await eliminarEmpleado(id)
        if (result.success) {
            res.status(result.status).json({
                success: true,
                message: result.message
            })
        } else {
            res.status(result.status).json({
                success: false,
                message: result.message
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

module.exports = { EliminarEmpleado }

