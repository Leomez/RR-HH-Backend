const { Empleado, Domicilio } = require('../../Config/db');
const { sequelize } = require('../../Config/db')
const {traerSector} = require("../Sector/TraerSector");

async function actualizarEmpleado(id, datos) {
  const t = await sequelize.transaction();
  try {
    const { domicilio, sector, ...datosEmpleado } = datos;

    console.log(domicilio);
    console.log(sector);
    console.log(datosEmpleado);

    if (domicilio) {
      const [domicilioActualizado] = await Domicilio.upsert(domicilio, {
        where: {
          calle: domicilio.calle,
          numero: domicilio.numero,
          ciudad: domicilio.ciudad,
          cod_postal: domicilio.cod_postal
        },
        transaction: t
      });

      datosEmpleado.id_domicilio = domicilioActualizado.id;
    }

    if (sector) {
      const sect = await traerSector(sector);      
      datosEmpleado.sector = sect.id;
    }
    console.log('estoy en la linea 32');
    const empleadoActualizado = await Empleado.update(    
      datosEmpleado,
      {
        where: {
          id: id
        },
        returned: true,
        transaction: t
      }
    );

    console.log('estoy en la linea 46');
    await t.commit();

    return {
      success: true,
      message: 'Empleado actualizado',
      data: empleadoActualizado
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al modificar el empleado",
      error: error.message
    };
  }
}


module.exports = { actualizarEmpleado };