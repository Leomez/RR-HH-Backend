const { Empleado } = require('../../Config/db')

async function eliminarEmpleado(id) {

    console.log('estoy en eliminar empleado');
    // const empleado = await Empleado.findById(id)
    // if (!empleado) {
    //      console.log('no hay empleado')}
    // console.log(empleado);
    try {
        await Empleado.destroy({
            where: {
                id: id
            }
        })
        return {
            success: true,
            message: 'Empleado eliminado'            
        }
        
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

module.exports = { eliminarEmpleado }