const { Tipo_licencia, Tipo_vacaciones, Empleado } = require('../../Config/db')

// const fechaIngreso = '2021-01-01'

function calcularAntiguedad(fechaIngreso) {
    return new Date().getFullYear() - new Date(fechaIngreso).getFullYear()
}

// get de licencias
async function get_tipos_licencia() {
    try {
        respuesta = await Tipo_licencia.findAll()
        if (respuesta.length > 0) {
            return {
                success: true,
                data: respuesta,
                message: 'Tipos de licencia recuperados correctamente'
            }
        } else {
            return {
                success: false,
                data: null,
                message: 'No hay tipos de licencia cargados'
            }
        }
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Error al recuperar los tipos de licencia'
        }
    }
}


// get de vacaciones
async function get_tipos_vacaciones(empleado_id) {
    try {        
        console.log(empleado_id, '<--empleado_id');
        const empleado = await Empleado.findByPk(empleado_id)
        // console.log(empleado, '<--empleado');
        const fecha_ingreso = empleado.fecha_ingr
        // console.log(fecha_ingreso, '<--fecha_ingreso');
        const antiguedad = calcularAntiguedad(fecha_ingreso)
        // console.log(antiguedad, '<--antiguedad');
        const tipos = await Tipo_vacaciones.findAll()
        if (tipos.length === 0) {
            return {
                success: false,
                data: null,
                message: 'No hay tipos de vacaciones cargados'
            }
        } else {
            function compararPorNombre(a, b) {
                if (a.nombre < b.nombre) {
                  return -1;
                } else if (a.nombre > b.nombre) {
                  return 1;
                } else {
                  return 0;
                }
              }

            tipos.sort(compararPorNombre);

            if (antiguedad === 0) {                
                return tipos[0];
            } else if (antiguedad >= 1 && antiguedad < 5) {                
                return tipos[1];
            } else if (antiguedad >= 5 && antiguedad < 10) {                
                return tipos[2];
            } else if (antiguedad >= 10 && antiguedad < 20) {                
                return tipos[3];
            } else if (antiguedad >= 20) {                
                return tipos[4];
            } else {
                console.error('Antigüedad no contemplada:', antiguedad);
                return null;
            }
        }
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Error al recuperar los tipos de vacaciones'
        }
    }
}


module.exports = {
    get_tipos_licencia,
    get_tipos_vacaciones
}