const { error } = require('pdf-lib')
const { traerEmpleados } = require('../../Services/Empleado/TraerEmpleado')
const { TraerEmpleadoXId} = require('../../Services/Empleado/TraerEmpleadoXId')

async function TraerEmpleados(req, res) {
    const query = await req.query
    const { id } = await req.params   
    try {       
        const empleados = await traerEmpleados(query)        
        if (empleados.success) {
            console.log(empleados.data);
            res.status(empleados.status).json({
                success: true,
                message: empleados.mensaje,
                data: await empleados.data
            })    
        } else {
            res.status(empleados.status).json({
                success: false,
                message: empleados.mensaje,
                error: empleados.error
            })
        }        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ningun empeado encontrado. Error en el servidor',
            error: error
        })
    }
}

async function TraerEmpleado (req, res){
    const { id } = req.params   
    try {       
        const empleado = await TraerEmpleadoXId(id)
        if (empleado.success) {
            res.status(empleado.status).json({
                success: true,
                message: empleado.mensaje,
                data: await empleado.data
            })
        } else {
            res.status(empleado.status).json({
                success: false,
                message: empleado.mensaje,
                error: empleado.error
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ningun empeado encontrado',
            error: error
        })
    }
}


module.exports = {    
    TraerEmpleados,    
    TraerEmpleado
}