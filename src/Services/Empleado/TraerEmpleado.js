const { Op } = require("sequelize");
const { Empleado } = require("../../Config/db");

async function traerEmpleados(query) {
  const { nombre, apellido, dni, legajo, fecha_nac, id } = query;  
  try {
    let whereClause = {};
    if (id) {
      whereClause.id = id;
    }  

    if (nombre) {
      whereClause.nombre_empleado = nombre
    }

    if (apellido) {
      whereClause.apellido_empleado = apellido
    }

    if (fecha_nac) {
      whereClause.fecha_nac = fecha_nac;
    }

    if (dni) {
      whereClause.dni = dni;
    }

    if (legajo) {
      whereClause.legajo = legajo;
    }
        
    const empleados = await Empleado.findAll({
      where: whereClause
    });    
    // console.log(empleados);
    if (empleados.length > 0) {
      return {
        success: true,
        mensaje: 'empleados encontrados',
        data: empleados
      }
    } else {
      return {
        success: false,
        mensaje: "Empleado no encontrado",
        data: empleados
      };
    }
  } catch (error) {
    return {
      success: false,
      mensaje: 'Error al buscar el empleado',
      error: error.message
    };
  }
}

module.exports = { traerEmpleados }