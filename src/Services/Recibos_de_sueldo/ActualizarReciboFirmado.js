const { sequelize } = require("../../Config/db")
const { Recibo_de_sueldo } = require("../../Config/db")

async function ActualizarRecibo(recibo) {
    const {id, archivo} = recibo
    const fechaActual = new Date();
    try {
        await Recibo_de_sueldo.update({
            estado: "Firmado",
            url_archivo: archivo.filename,
            fecha_firma: fechaActual,
        },{
            where: {id: id}
        })
        return {
            success: true,
            message: "Recibo Actualizado"
        }        
    } catch (error) {
        return {
            success: false,
            message: error.message,
            error: error
        }
    }
}

module.exports = { ActualizarRecibo }