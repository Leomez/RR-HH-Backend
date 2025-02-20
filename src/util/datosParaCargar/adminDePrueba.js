const { Empleado } = require('../../Config/db')

// Función para crear empleado de prueba
async function crearEmpleadoDePrueba() {    

    // Verificar si ya existe un admin
    const adminExistente = await Empleado.findOne({ where: { permisos: 'ADMIN' } });

    if (!adminExistente) {
        // Si no existe un admin, crearlo
        await Empleado.create({
            legajo: "111111",
            dni: "11111111",
            nombre_empleado: "Maria",
            apellido_empleado: "Admin D'Prueba",
            fecha_nac: "1980-11-11",
            telefono: "1111111111",
            correo: "maria_admin@ejemplo.com",
            fecha_ingr: "2017-07-12",
            cargo: "Gerente",
            categoria: "Fuera de Convenio",
            permisos: "ADMIN",
            estado: "Activo"
        });
        console.log('Empleado de prueba con permisos ADMIN creado');
        console.log('Registrarse con el siguiente mail: maria_admin@ejemplo.com');
    } else {
        console.log('Ya existe un empleado con permisos ADMIN.');
    }
}

module.exports = { crearEmpleadoDePrueba };