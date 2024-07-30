const { Sector } = require('../../Config/db')

async function crearSector(sector) {  
    try {        
        
        let s = null  
        try {
            s = await Sector.create({
                nombre_sector: sector
            });
        } catch (error) {
            console.error('Error al crear el sector:', error);
            return {
                success: false,
                mensaje: 'error al crear el sector',
                error: error.message,
                status: 500
            }
        }        
        return {
            success: true,
            mensaje: 'Sector creado con exito',
            sector: s,
            status: 200
        }
    } catch (error) {        
        return {
            success: false,
            mensaje: 'error al crear el sector',
            error: error.message,
            status: 500
        }
    }
}

module.exports = { crearSector }