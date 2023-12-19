const { Empleado, Op} = require('../../Config/db')

async function Cumpleanios() {
    // Obtener la fecha actual
    const fechaActual = new Date();
    
    // Calcular la fecha de final de mes
    const ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    // Consultar empleados cuyo cumpleaños está en el rango del mes actual
    const empleadosCumpleanios = await Empleado.findAll({
        where: {
            fecha_nac: {
                [Op.between]: [fechaActual, ultimoDiaMes]
            }
        }
    });

    return empleadosCumpleanios
}