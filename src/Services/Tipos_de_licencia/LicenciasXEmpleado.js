const { Licencia_empleado, Tipo_licencia } = require("../../Config/db")

async function LicenciaXEmpleado(empleado_id) {
    try {
        const tipoLicencias = await Tipo_licencia.findAll()
        const licencias = await tipoLicencias.map(tipo => {
            return {
                empleado_id: empleado_id,
                tipo: tipo.nombre,
                dias_pendientes: tipo.cantDias               
            }
        })
        const createdLicencias = await Licencia_empleado.bulkCreate(licencias)
        return createdLicencias
    } catch (error) {
        console.log(error);
        return error
    }
}


module.exports = { LicenciaXEmpleado }