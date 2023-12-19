const { Usuario, Empleado } = require('../../Config/db')
const { registrarse } = require('./Registrarse')

async function IniciarSesion(user) {    
    try {
        const empleadoHabilitado = await Empleado.findOne({
            where: { correo: user.email }
        })

        let currentUser = await Usuario.findOne({
            where: { id: user.uid }
        })
        
        if (!currentUser) {
            if (!empleadoHabilitado) {
                return {
                    success: false,
                    mensaje: 'No se encontró ningun empleado con ese correo elctrónico en la base de datos',
                    error: 'Empleado no encontrado'
                }
            } else {
                currentUser = await registrarse(user)
                if (!currentUser.success) {
                    return {
                        success: false,
                        message: 'Hubo un error al intentar iniciar sesion',
                        error: currentUser.error
                    }
                } else {
                    return {
                        success: true,
                        message: `Hola ${currentUser.data.usuario}`,
                        data: currentUser.data
                    }
                }
            }
        } else {
            return {
                success: true,
                message: `Hola ${currentUser.dataValues.usuario}`,
                data: currentUser.dataValues
            }
        }

    } catch (error) {
        console.error('Error al iniciar secion-->: ', error)
        return {
            success: false,
            message: 'Hubo un error al intentar iniciar sesion',
            error: error
        }
    }
}

module.exports = { IniciarSesion }