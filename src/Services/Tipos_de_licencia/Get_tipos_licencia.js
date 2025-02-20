const { Tipo_licencia, Tipo_vacaciones, Empleado } = require('../../Config/db')

// const fechaIngreso = '2021-01-01'

// Función auxiliar para calcular la antigüedad
function calcularAntiguedad(fecha_ingreso) {
    const hoy = new Date();
    const fechaIngreso = new Date(fecha_ingreso);
    let antiguedad = hoy.getFullYear() - fechaIngreso.getFullYear();
    const m = hoy.getMonth() - fechaIngreso.getMonth();

    // Ajuste de antigüedad si el mes actual es anterior al mes de ingreso
    // o si estamos en el mismo mes pero el día actual es anterior al día de ingreso
    if (m < 0 || (m === 0 && hoy.getDate() < fechaIngreso.getDate())) {
        antiguedad--;
    }
    return antiguedad;
}


// get de licencias
async function get_tipos_licencia() {
    try {
        respuesta = await Tipo_licencia.findAll()
        if (respuesta.length > 0) {
            return {
                success: true,
                data: respuesta,
                message: 'Tipos de licencia recuperados correctamente',
                status: 200
            }
        } else {
            return {
                success: false,
                data: null,
                message: 'No hay tipos de licencia cargados',
                status: 400
            }
        }
    } catch (error) {
        return {
            success: false,
            data: null,
            message: 'Error al recuperar los tipos de licencia',
            status: 500
        }
    }
}


// get de vacaciones
async function get_tipos_vacaciones(empleado_id) {
    try {        
        console.log(empleado_id, '<--empleado_id');
        // traigo un empleado por id
        const empleado = await Empleado.findByPk(empleado_id)

        // separo la fecha de ingreso
        const fecha_ingreso = empleado.fecha_ingr
        
        // calculo la antiguedad
        const antiguedad = calcularAntiguedad(fecha_ingreso)

        // traigo todos los tipos de vacaciones
        const tipos = await Tipo_vacaciones.findAll()
        if (tipos.length === 0) {
            //respondo en caso de no haber tipos cargados
            return {
                success: false,
                data: null,
                message: 'No hay tipos de vacaciones cargados',
                status: 400
            }
        } else {
            //respondo si encuentro tipos cargados

            // funcion parametro para ordenar los tipos de vacaciones por nombre [1, 2, 3, 4, 5]
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
            //retorno el tipo de vacaciones segun la antigüedad del empleado
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
            message: 'Error al recuperar los tipos de vacaciones',
            status: 500
        }
    }
}


module.exports = {
    get_tipos_licencia,
    get_tipos_vacaciones
}