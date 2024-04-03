const { TraerSupervisores } = require('../../Services/Supervisor/TraerSupervisores')

async function TraerSupervisorController(req, res) {
    const { sectorId } = req.query
    try {
        const resp = await TraerSupervisores(sectorId)
        if (resp.success) {
            console.log(resp.data);
            res.status(200).json({
                success: resp.success,
                message: resp.message,
                data: resp.data
            })
        } else {
            res.status(400).json({
                success: resp.success,
                message: resp.message,
                data: resp.data,
                error: resp.error
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error
        })        
    }    
}


module.exports = { TraerSupervisorController }