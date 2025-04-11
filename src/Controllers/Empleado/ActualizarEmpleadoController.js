const { actualizarEmpleado } = require('../../Services/Empleado/ActualizarEmpleado')

async function ActualizarEmpleado(req, res) {
    const { id } = req.params;
    const datos = req.body;

    if (req.file) {
        datos.foto = `${req.protocol}://${req.get('host')}/${req.file.path}`;
        // datos.foto = req.file.path;
    }
    // console.log('🚀 Actualizando empleado ID:', id);
    // console.log('🚀 Datos:', datos);
    try {
        const response = await actualizarEmpleado(id, datos);
        if (response.error) {
            res.status(response.status).json({
                success: false,
                message: response.message,
                data: response.data,
                error: response.error
            })
        } else {
            res.status(response.status).json({
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
