const { Empleado, Tipo_licencia, Licencia_empleado } = require('../../Config/db');

async function bulkLicenciaXEmpleado() {
    const empleados = await Empleado.findAll();
    const tipoLicencias = await Tipo_licencia.findAll();

    const licencias = tipoLicencias.flatMap(l => 
        empleados.map(e => ({
            empleado_id: e.id,
            tipo: l.nombre,
            dias_pendientes: l.cantDias
        }))
    );

    const createdLicencias = await Licencia_empleado.bulkCreate(licencias);

    console.log('Se crearon los siguientes registros en la tabla Licencia_empleado:', createdLicencias);
    return createdLicencias;
}

module.exports = {
    bulkLicenciaXEmpleado
};
