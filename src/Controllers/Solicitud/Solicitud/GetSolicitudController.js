const { getSolicitudes, getSolicitudesElevadas, getSolicitudesXEmpleado, getAllSolicitudes } = require('../../../Services/Solicitudes/GetSolicitudes');

// Maneja la respuesta de la API
function handleResponse(res, respuesta) {
    if (respuesta.success) {
        return res.status(respuesta.status).json({
            success: true,
            data: respuesta.data,
            message: respuesta.message,
            
        });
    } else {
        return res.status(respuesta.status).json({
            success: respuesta.success,
            message: respuesta.message,
            error: respuesta.error
        });
    }
}

// Maneja los errores de la API
function handleError(res, error) {
    return res.status(500).json({
        success: false,
        message: error.message,
        error: error
    });
}

// Función base para manejar las solicitudes
async function baseController(req, res, serviceFunction, id) {
    console.log(`estoy en el contrlador de solicitudes...`);
    try {
        const respuesta = id ? await serviceFunction(id) : await serviceFunction();
        return handleResponse(res, respuesta);
    } catch (error) {
        return handleError(res, error);
    }
}

// Controlador de solicitudes para el supervisor
async function getSolicitudController(req, res) {
    const { id } = req.query;
    await baseController(req, res, getSolicitudes, id);
}

// Controlador de solicitudes elevadas para el jefe de RRHH
async function getSolicitudElevadaController(req, res) {
    await baseController(req, res, getSolicitudesElevadas);
}

// Controlador de solicitudes para un empleado
async function getSolicitudEmpleadoController(req, res) {
    const { id } = req.query;
    await baseController(req, res, getSolicitudesXEmpleado, id);
}

async function getAllSolicitudesController(req, res) {
    await baseController(req, res, getAllSolicitudes);
}

module.exports = { getSolicitudController, getSolicitudElevadaController, getSolicitudEmpleadoController, getAllSolicitudesController };
