const { IniciarSesion } = require('../../Services/Sesion/IniciarSesion')
const { catchAsync } = require('../../Middleware/catchAsync')


async function InicioSesionController(req, res) {
    const { user } = req
    const resultado = await IniciarSesion(user)
    if (resultado.success) {
        resultado.data.token = req.token
        res.status(resultado.status).json({
            success: true,
            message: resultado.message,
            data: resultado.data
        });
    } else {
        console.log(resultado.mensaje);
        res.status(resultado.status).json({
            success: false,
            message: resultado.message,
            error: resultado.error
        });
    }

}

module.exports = {
    InicioSesionController: catchAsync(InicioSesionController)
}

// module.exports = { InicioSesionController }