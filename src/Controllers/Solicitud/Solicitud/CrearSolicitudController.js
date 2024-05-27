const {crearSolicitudes} = require('../../../Services/Solicitudes/CrearSolicitudes')

async function crearSolicitudController(req, res) {
    try {
        // console.log(req.body);
    //    const {solicitud} = req.body
       const respuesta = await crearSolicitudes(req.body)
       if (respuesta.success) {
        res.status(200).json({
            message: respuesta.message,
            data: respuesta.data,            
        })
       } else {
        res.status(400).json({
            message: `Error en el controlador: ${respuesta.message}`,
            data: respuesta.data,
            error: respuesta.error
        })
       } 
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: error
        })
    }
    
}

module.exports = { crearSolicitudController };

