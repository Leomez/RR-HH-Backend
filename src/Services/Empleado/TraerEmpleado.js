const { Op } = require("sequelize");
const { Empleado, Usuario, Domicilio, Sector } = require("../../Config/db");
const express = require("express");
const path = require("path");

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
      where: whereClause,
      include: [
        {model: Domicilio},
        {model: Sector,
          attributes: ['nombre_sector']
        }
      ],      
    }); 
 
    // for (let i = 0; i < empleados.length; i++) {      
    //   console.log(empleados[i].dataValues.id);
    //   console.log(empleados[i].dataValues.nombre_empleado);
    //   console.log(empleados[i].dataValues.apellido_empleado);
    //   console.log(`empleado ${i + 1}`);      
    // }   

    if (empleados.length > 0) {
      // const data = [];
      // //mapealo para traer la foto del usuario
      // // console.log(empleados, '<<--- empleados');
      // try {
      //   for (let i = 0; i < empleados.length; i++){
      //     const usuario = await Usuario.findOne({
      //       where: {
      //         EmpleadoId: empleados[i].id
      //       }
      //     })
      //     if (usuario !== null) {
      //       // console.log(usuario.dataValues.foto, '<<--- foto'); 
      //       const foto = usuario.dataValues.foto;          
      //       data.push({...empleados[i].dataValues, foto: foto})                      
      //     }
      //   }    
      //   // console.log(data);
        
      // } catch (error) {
      //   console.log(error);
      // }    
      return {
        success: true,
        mensaje: 'empleados encontrados',
        data: empleados,
        status: 200
      }
    } else {
      return {
        success: false,
        mensaje: "Empleado no encontrado",
        data: empleados,
        status: 404
      };
    }
  } catch (error) {
    return {
      success: false,
      mensaje: 'Error al buscar el empleado',
      error: error.message,
      status: 500
    };
  }
}

module.exports = { traerEmpleados }