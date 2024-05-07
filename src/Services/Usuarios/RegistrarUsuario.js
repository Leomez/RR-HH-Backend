const path = require('path')
const { admin } = require('../../Firebase/firebase')
const { app } = require('../../Firebase/firebase')
const { getAuth } = require('firebase-admin/auth');
const { sequelice } = require("../../Config/db")
const { Empleado } = require("../../Config/db");
const { Usuario } = require('../../Config/db');
const sinFoto = path.join(__dirname, '..', 'assets', 'noFoto.png');
// const sinFoto = require('../../assets/noFoto.png');

async function CrearUsuario(datos) {

  const { email, password } = datos;
  const auth = getAuth(app);

  try {
    const usuarioAutorizado = await Empleado.findOne({
      where: { correo: email }
    })      

    if (usuarioAutorizado === null) {
      return {
        success: false,
        message: 'Usuario no autorizado',
        error: 'No existe un empleado en la base de datos con ese email'
      }
    } else {
      
      // Crear usuario en Firebase
      const userRecord = await auth.createUser({
        email: email,
        password: password,
        displayName: usuarioAutorizado.dataValues.nombre_empleado
      });
      
      // Crear usuario en la base de datos
      const nuevoUsuario = await Usuario.create({
        id: userRecord.uid,
        usuario: userRecord.displayName,
        foto: userRecord.photoURL || sinFoto,
        rol: usuarioAutorizado.dataValues.permisos,
        EmpleadoId: usuarioAutorizado.dataValues.id
      })
      return {
        success: true,
        message: 'Usuario creado exitosamente',
        data: nuevoUsuario
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error de registro',
      error: error.message
    }
  }
}

module.exports = { CrearUsuario }
