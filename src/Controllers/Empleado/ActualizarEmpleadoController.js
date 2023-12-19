const { actualizarEmpleado } = require('../../Services/Empleado/ActualizarEmpleado')

async function ActualizarEmpleado(req, res) {
    const { id } = req.params;
    const datos = req.body;

    try {
        const response = await actualizarEmpleado(id, datos);
        if (response.error) {
            res.status(400).json({
                success: false,
                message: response.message,
                data: response.data,
                error: response.error
            })
        } else {
            res.status(200).json({
                success: true,
                message: response.message,
                data: response.data,
                error: response.error
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { ActualizarEmpleado };
