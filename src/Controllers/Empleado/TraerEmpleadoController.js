const { traerEmpleados } = require('../../Services/Empleado/TraerEmpleado')
const { TraerEmpleadoXId} = require('../../Services/Empleado/TraerEmpleadoXId')

async function TraerEmpleados(req, res) {
    const query = await req.query
    const { id } = await req.params   
    try {       
        const empleados = await traerEmpleados(query)        
        if (empleados.success) {
            res.status(200).json({
                success: true,
                message: empleados.mensaje,
                data: await empleados.data
            })    
        } else {
            res.status(404).json({
                success: false,
                message: empleados.mensaje,
                error: empleados.error
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

async function TraerEmpleado (req, res){
    const { id } = req.params   
    try {       
        const empleado = await TraerEmpleadoXId(id)
        if (empleado.success) {
            res.status(200).json({
                success: true,
                message: empleado.mensaje,
                data: await empleado.data
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