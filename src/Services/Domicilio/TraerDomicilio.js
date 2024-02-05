const { Domicilio } = require('../../Config/db')


async function TraerDomicilio() {
    try {
        const domicilios = await Domicilio.findAll()
        if (domicilios.length > 0) {
            return {
                success: true,
                message: 'Domicilios encontrados',
                data: domicilios
            }            
        } else {
            return {
                success: false,
                message: 'Nose encontro ningun resultado',
                data: null
            }
        }        
    } catch (error) {
        return {
            success: false,
            message:`Error en la base de datos: ${error.message}`,
            data: null
        }
    }
}

module.exports = {TraerDomicilio}