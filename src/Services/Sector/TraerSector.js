const { Sector } = require("../../Config/db");
// const { sequelize } = require("../../Config/db");


async function traerSector(sector) {
    // const t = await sequelize.transaction();
    try {
        if (sector) {            
            const sect = await Sector.findOne(
                {
                    where: {
                        nombre_sector: sector
                    }
                }
            );
            return {
                success: true,           
                data: sect
            };    
        } else {
            const sectores = await Sector.findAll();            
            return {
                success: true,           
                data: sectores
            };
        }
        
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

module.exports = {
    traerSector
}