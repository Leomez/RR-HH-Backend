const { Sector } = require("../../Config/db");

async function traerSectorXId(id) {
    try {
        const sector = await Sector.findByPk(id);
        if (sector) {
            return{
                success: true,
                sector: sector,
            }
        } else {
            return {
                success: false,
                message: "No existe el sector con ese id"
            }
        }        
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

module.exports = { traerSectorXId };