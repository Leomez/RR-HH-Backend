const { 
    GetRegistro, 
    RegistrarIngreso, 
    RegistrarSalida, 
    RegistrarInicioDePausa, 
    RegistrarFinDePausa 
} = require('../../Services/Asistencia/Asistencia') 

async function handleRequest(serviceFunction, req, res) {
    const id = req.body.id || req.params.id;
    try {
        const respuesta = await serviceFunction(id);
        return res.status(respuesta.status).json(respuesta);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function GetRegistroController(req, res) {
    return handleRequest(GetRegistro, req, res);
}

async function FinDePausaController(req, res) {
    return handleRequest(RegistrarFinDePausa, req, res);
}

async function IngresoController(req, res) {
    return handleRequest(RegistrarIngreso, req, res);
}

async function SalidaController(req, res) {
    return handleRequest(RegistrarSalida, req, res);
}

async function InicioDePausaController(req, res) {
    return handleRequest(RegistrarInicioDePausa, req, res);
}

module.exports = {
    GetRegistroController,
    FinDePausaController,
    IngresoController,
    SalidaController,
    InicioDePausaController
};
