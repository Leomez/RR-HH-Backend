const { IniciarSesion } = require('../../Services/Sesion/IniciarSesion')

async function InicioSesionController(req, res) {
    const { user } = req   
    try {
        const resultado = await IniciarSesion(user)
        if (resultado.success) {
            res.status(200).json({
                success: true,
                message: resultado.message,
                data: resultado.data
            });
        } else {
            console.log(resultado.mensaje);
            res.status(500).json({
                success: false,
                message: resultado.message,
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

module.exports = { InicioSesionController }