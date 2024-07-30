const { Usuario, Empleado, Sector } = require('../../Config/db')

async function registrarse(user) {
    try {
        const empleadoHabilitado = await Empleado.findOne({
            where: { correo: user.email }
        })                

        if (!empleadoHabilitado) {
            return {
                success: false,
                mensaje: 'No se encontró ningun empleado con ese correo elctrónico en la base de datos',
                error: 'Empleado no encontrado',
                status: 404
            }
        } else {
            const usuario = await Usuario.create({
                id: user.uid,
                usuario: user.name,
                foto: user.picture,
                rol: empleadoHabilitado.dataValues.permisos,
                EmpleadoId: empleadoHabilitado.dataValues.id
            })
            return {                
                success: true,
                message: 'Usuario creado exitosamente',
                data: usuario,
                status: 200
            }
        }        
    } catch (error) {        
        return {
            success: false,
            message: 'Error al crear el usuario: ',
            error: new Error(error.message),
            status: 500
        }
    }

}

module.exports = { registrarse }