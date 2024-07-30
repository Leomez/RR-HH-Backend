const { Domicilio } = require('../../Config/db')


async function TraerDomicilio() {
    try {
        const domicilios = await Domicilio.findAll()
        if (domicilios.length > 0) {
            return {
                success: true,
                message: 'Domicilios encontrados',
                data: domicilios,
                status: 200
            }            
        } else {
            return {
                success: false,
                message: 'Nose encontro ningun resultado',
                data: null,
                status: 404
            }
        }        
    } catch (error) {
        return {
            success: false,
            message:`Error en la base de datos: ${error.message}`,
            data: null,
            status: 500
        }
    }
}

module.exports = {TraerDomicilio}