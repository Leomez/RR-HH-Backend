const { crearSector } = require('../../Services/Sector/CrearSector');
// const { modificarSector } = require('../../Services/Sector/ModificarSector');
const { traerSector } = require('../../Services/Sector/TraerSector');
const { traerSectorXId } = require('../../Services/Sector/TraerSectorXId');

async function NuevoSector(req, res) {
    const datos = await req.body.nombre_sector;
    // console.log(datos);
    try {
        const resultado = await crearSector(datos);
        // console.log(sector);
        if (resultado.success) {
            res.status(resultado.status).json({
                success: true,
                message: resultado.mensaje,
                data: resultado.sector
            });    
        } else {
            res.status(resultado.status).json({
                success: false,
                message: resultado.mensaje,
                error: resultado.error,
            });    
        }        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en servidor',
            error: error.message,
        });
        
    }
}

// async function ModificarSector(req, res) {
//     const { id } = req.params;
//     const { nombre, jefe } = req.body;

//     try {
//         const sectorModificado = await modificarSector(id, { nombre, jefe });

//         res.status(200).json({
//             success: true,
//             message: 'Sector modificado correctamente',
//             data: sectorModificado,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error al modificar el sector',
//             error: error.message,
//         });
//     }
// }
async function TraerSectorXId(req, res) {
    const { id } = req.params;
    const resp = await traerSectorXId(id);    
    try {
        res.status(resp.status).json({
            success: true,
            data: resp.sector
        })
    } catch (error) {
        resp.status(resp.status).json({
            success: false,
            message: 'Error en servidor',
            error: error.message,
        })
    }
}

async function TraerSector(req, res) {
    const { nombre_sector } = req.query;      
    const sector = await traerSector(nombre_sector)    
    try {
        res.status(sector.status).json({
            success: sector.success,
            data: sector.data? sector.data : null,
            message: sector.message
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: sector.message
        })        
    }
}




module.exports = { NuevoSector, TraerSector, TraerSectorXId };