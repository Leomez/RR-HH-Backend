const { Usuario, Empleado } = require('../../Config/db');
const { registrarse } = require('./Registrarse');
// const { appError } = require('../../util/appError')


async function IniciarSesion(user) {    
    try {
        // console.log(user);
        const empleadoHabilitado = await Empleado.findOne({
            where: { correo: user.email }
          });
        
          let currentUser = await Usuario.findOne({
              where: { id: user.uid  }
          })
        
        // let todosLosUsuarios = await Usuario.findAll()
        // console.log(todosLosUsuarios);
        // console.log(empleadoHabilitado);
        // const empleados = await Empleado.findAll()
        // console.log(empleados, '<--- empleados');
        // console.log(currentUser);
        
        if (!currentUser) {
            if (!empleadoHabilitado) {
                return {
                    success: false,
                    mensaje: 'No se encontró ningun empleado con ese correo elctrónico en la base de datos',
                    error: 'Empleado no encontrado',
                    status: 401
                }
            } else {
                currentUser = await registrarse(user)
                if (!currentUser.success) {
                    return {
                        success: false,
                        message: 'Hubo un error al intentar iniciar sesion',
                        error: currentUser.error,
                        status: currentUser.status
                    }
                } else {
                    return {
                        success: true,
                        message: `Hola ${currentUser.data.usuario}`,
                        data: currentUser.data,
                        status: 200
                    }
                }
            }
        } else {
            return {
                success: true,
                message: `Hola ${currentUser.dataValues.usuario}`,
                data: currentUser.dataValues,
                status: 200
            }
        }

    } catch (error) {
        console.error('Error al iniciar secion-->: ', error)
        return {
            success: false,
            message: 'Hubo un error al intentar iniciar sesion.',
            error: error,
            status: 500
        }
    }
}

module.exports = { IniciarSesion }