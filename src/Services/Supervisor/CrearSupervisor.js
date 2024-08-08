const { Empleado } = require("../../Config/db");
const { Sector } = require("../../Config/db")
const { Supervisor } = require("../../Config/db")

async function CrearSupervisor(empleadoId, sectorId) {
    try {
        const sector =await Sector.findByPk(sectorId)
        const codigo = Math.ceil(Math.random()*30)
        
        if (!sector) {
            return{
                success: false,
                mensaje: 'No se encontró el sector.',
                error: 'Sector no encontrado.'
            }
        } else {
            const superv = await Supervisor.create({
                codigo,
                empleadoId: empleadoId,
                SectorId: sectorId
            })
            return{
                success: true,
                mensaje:'Supervisor asignado exitosamente.',
                data: superv.dataValues
            }
        }
    } catch (error) {
        return{
            success: false,
            mensaje: 'Error al intentar asignar al supervisor',
            error: error.message
        }
    }
}

module.exports = { CrearSupervisor }