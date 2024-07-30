const { CrearUsuario } = require('../../Services/Usuarios/RegistrarUsuario')

async function RegistrarUsuario(req, res) {
    const userData = req.body
    try {
        const respuesta = await CrearUsuario(userData)
        console.log('respuesta del controlador: '+ respuesta);
        if (respuesta.success) {
            res.status(respuesta.status).json({
                success: true,
                message: respuesta.message,
                data: respuesta.data
            });
        } else {
            res.status(respuesta.status).json({
                success: false,
                message: respuesta.message,
                error: respuesta.error
            })
        }        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error del servidor',
            error: error.message
        })        
    }
}

module.exports = { RegistrarUsuario }