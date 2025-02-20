const { Supervisor } = require('../../Config/db')

async function TraerSupervisores(sectorId) {
    try {
        let superv;
        if (sectorId) {
            superv = await Supervisor.findAll({
                where: {
                    SectorId: sectorId
                },
                attributes: ['id', 'codigo', 'empleadoId', 'SectorId']
            })
        } else {
            superv = await Supervisor.findAll({
                attributes: ['id', 'codigo', 'empleadoId', 'SectorId']
            })
        }

        if (superv.length > 0) {
            return {
                success: true,
                message: 'Supervisores encontrados:',
                data: superv.map(s => s.dataValues)
            }
        } else {
            return {
                success: false,
                message: 'No se encontro ningun supervisor:',
                data: null
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error al intentar buscar supervisor:',
            error: error
        }
    }
}

module.exports = { TraerSupervisores }