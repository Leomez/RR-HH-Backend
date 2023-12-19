const { eliminarEmpleado } = require('../../Services/Empleado/EliminarEmpleado')


async function EliminarEmpleado(req, res) {
    const { id } = req.params
    try {
        const result = await eliminarEmpleado(id)
        if (result.success) {
            res.status(200).json({
                success: true,
                message: result.message
            })
        } else {
            res.status(500).json({
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

