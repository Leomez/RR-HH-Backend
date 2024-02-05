//servicios....
const { crearEmpleado } = require('../Services/Empleado/CrearEmpleado')
const { crearSector } = require('../Services/Sector/CrearSector')
//datos...
const empleados = require('./datosParaCargar/empleados.json')
const sectores = require('./datosParaCargar/sectores.json')




async function iniciarDatos() {    
    try {
        await Promise.all(sectores.map(s => {            
            crearSector(s.nombre_sector)
            // console.log(`sector ${s.nombre_sector} creado exitosamente...`);
        }));
        await Promise.all(empleados.map(e => {
            // console.log(e.sector);
            // file deepcode ignore PromiseNotCaughtNode: <please specify a reason of ignoring this>
            crearEmpleado(e).then(en => {
            // console.log(`empleado ${en.data} creado exitosamente...`);
            })
        }))        
    } catch (error) {
        console.log(error);
    }    
}

module.exports = { iniciarDatos }