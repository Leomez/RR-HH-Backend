const { CrearSupervisor } = require('../../Services/Supervisor/CrearSupervisor')

async function CrearSupervisorController(req, res) {
    const {empleadoId, sectorId} = req.body
    try {
        const resp = await CrearSupervisor(empleadoId, sectorId)
        if (resp.success) {
            res.status(200).json({
                success:resp.success,
                message: resp.mensaje,
                data: resp.data
            })
        } else {
            res.status(400).json({
                succes:resp.success,
                message: resp.mensaje,
                error: resp.error
            })
        }   
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error: error
        })
    }    
}

module.exports = { CrearSupervisorController }