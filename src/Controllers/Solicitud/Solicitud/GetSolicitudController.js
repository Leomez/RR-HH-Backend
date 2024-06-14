const { getSolicitudes, getSolicitudesElevadas, getSolicitudesXEmpleado } = require('../../../Services/Solicitudes/GetSolicitudes')


//get de solicitudes para el supervisor
async function getSolicitudController(req, res) {
    //por id de supervisor
    const { id } = req.query
    
    try {
        const respuesta = await getSolicitudes(id)
        if (respuesta.success) {
            return res.status(200).json({
                success: true,
                data: respuesta.data,
                message: respuesta.message
            })
        } else {
            return res.status(400).json({
                success: false,
                message: respuesta.message,
                error: respuesta.error
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}


//get de solicitudes para el jefe de RRHH
async function getSolicitudElevadaController(req, res) {
    try {        
        const respuesta = await getSolicitudesElevadas()
        if (respuesta.success) {            
            return res.status(200).json({
                success: respuesta.success,
                data: respuesta.data,
                message: respuesta.message
            })            
        } else {
            return res.status(400).json({
                success: respuesta.success,
                message: respuesta.message,
                error: respuesta.error
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}


//get de solicitudes para un empleado
async function getSolicitudEmpleadoController(req, res) {
    //por id de empleado
    const { id } = req.query
    try {
        const respuesta = await getSolicitudesXEmpleado(id)
        if (respuesta.success) {
            return res.status(200).json({
                success: respuesta.success,
                data: respuesta.data,
                message: respuesta.message
            })
        } else {
            return res.status(400).json({
                success: respuesta.success,
                message: respuesta.message,
                error: respuesta.error
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }

}

module.exports = { getSolicitudController, getSolicitudElevadaController, getSolicitudEmpleadoController }