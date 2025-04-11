const { Empleado, Domicilio } = require('../../Config/db');
const { sequelize } = require('../../Config/db');
const { traerSector } = require("../Sector/TraerSector");
const { json } = require('body-parser');

async function actualizarEmpleado(id, datos) {
  const t = await sequelize.transaction();

  try {
    const { domicilio, sector, ...datosEmpleado } = datos;

    // console.log('🚀 Actualizando empleado ID:', id);
    // console.log('🚀 Datos:', datos);

    // Verificar si el empleado existe
    const empleadoExistente = await Empleado.findByPk(id);
    if (!empleadoExistente) {
      await t.rollback();
      return {
        success: false,
        message: "Empleado no encontrado",
        status: 404
      };
    }

    // Actualizar domicilio si existe
    if (domicilio) {
      // console.log('🚀 Verificando domicilio:', domicilio);

      let domicilioString;

      if (Array.isArray(domicilio)) {
        domicilioString = domicilio.find(d => typeof d === "string" && d.includes("{"));
      } else if (typeof domicilio === "string") {
        domicilioString = domicilio[0]
      }

      if (!domicilioString) {
        throw new Error("El domicilio no tiene un formato válido.");
      }
      // console.log('🚀 Domicilio:', JSON.parse(domicilioString));
      try {
        const domicilioJson = JSON.parse(domicilioString);
        const domicilioActual = {
          calle: domicilioJson.calle,
          numero: domicilioJson.numero,
          piso: domicilioJson.piso,
          depto: domicilioJson.depto,
          ciudad: domicilioJson.ciudad,
          cod_postal: domicilioJson.cod_postal
        }

        // const [domicilioActualizado] = await Domicilio.create({
        //   ...domicilioActual
        // })

        const domicilioExistente = await Domicilio.findOne({
          where: {
            calle: domicilioJson.calle,
            numero: domicilioJson.numero,
            piso: domicilioJson.piso || null,
            depto: domicilioJson.depto || null,
            ciudad: domicilioJson.ciudad,
            cod_postal: domicilioJson.cod_postal
          },
          transaction: t
        });

        if (domicilioExistente) {
          datosEmpleado.domicilio_id = domicilioExistente.id;
        } else {
          const nuevoDomicilio = await Domicilio.create(domicilioActual, { transaction: t });
          datosEmpleado.domicilio_id = nuevoDomicilio.id;
        }

      } catch (error) {
        throw new Error("Error al procesar el domicilio: " + error.message);
      }
    }


    // Asignar sector si se proporciona
    if (sector) {
      const sect = await traerSector(sector);
      if (sect) {
        datosEmpleado.sector = sect.id;
      } else {
        await t.rollback();
        return {
          success: false,
          message: "Sector no encontrado",
          status: 404
        };
      }
    }

    // Actualizar empleado
    // datosEmpleado.deleted_at = null; // Asegurarse de que el campo deleted_at esté en null al actualizar
    const [rowsUpdated] = await Empleado.update({
      ...datosEmpleado,
      borrado: null,
    }, {
      where: { id },      
      transaction: t
    }

    );

    if (rowsUpdated === 0) {
      await t.rollback();
      return {
        success: false,
        message: "No se pudo actualizar el empleado",
        status: 400
      };
    }

    // Recuperar el registro actualizado manualmente (MySQL no soporta returning: true)

    const empleadoActualizado = await Empleado.findByPk(id, { transaction: t });

    console.log('🚀 Empleado actualizado:', empleadoActualizado);
    console.log('Filas actualizadas:', rowsUpdated);

    await t.commit();

    return {
      success: true,
      message: 'Empleado actualizado exitosamente',
      data: empleadoActualizado,
      status: 200
    };

  } catch (error) {
    await t.rollback();
    console.error("❌ Error en actualizarEmpleado:", error);

    return {
      success: false,
      message: "Error al modificar el empleado",
      error: error.message,
      status: 500
    };
  }
}

module.exports = { actualizarEmpleado };
