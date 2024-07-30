const { Sector } = require("../../Config/db");

async function traerSectorXId(id) {
    try {
        const sector = await Sector.findByPk(id);
        if (sector) {
            return{
                success: true,
                sector: sector,
                message: "Sector encontrado",
                status: 200
            }
        } else {
            return {
                success: false,
                message: "No existe el sector con ese id",
                status: 404
            }
        }        
    } catch (error) {
        return {
            success: false,
            message: error.message,
            status: 500
        }
    }
}

module.exports = { traerSectorXId };