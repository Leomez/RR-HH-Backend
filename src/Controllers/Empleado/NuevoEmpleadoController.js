const { crearEmpleado } = require('../../Services/Empleado/CrearEmpleado')

async function NuevoEmpleado(req, res) {
    const datos = req.body;
    // console.log(datos);
    try {
        const resultado = await crearEmpleado(datos);        
        if (resultado.success) {
            console.log(resultado.data);
            res.status(200).json({
                success: true,
                message: resultado.mensaje,
                data: resultado.data
            });
        } else {
            console.log(resultado.mensaje);
            res.status(500).json({
                success: false,
                message: resultado.mensaje,
                error: resultado.error
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
}


module.exports = { NuevoEmpleado };