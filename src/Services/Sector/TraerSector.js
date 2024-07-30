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
            if (sect === null) {
                return {
                    success: false,
                    message: "No existe el sector con ese nombre",
                    status: 404
                }
            } else {
                return {
                    success: true,
                    data: sect,
                    message: "Sector encontrado",
                    status: 200
                }
            };
        } else {
            const sectores = await Sector.findAll();
            if (sectores === null) {
                return {
                    success: false,
                    message: "No existen sectores",
                    status: 404
                }
            } else {
                return {
                    success: true,
                    data: sectores,
                    message: "Sectores encontrados",
                    status: 200
                };
            }
        }

    } catch (error) {
        return {
            success: false,
            message: `Error al buscar el sector: ${error.message}`,
            status: 500
        }
    }
}

module.exports = {
    traerSector
}