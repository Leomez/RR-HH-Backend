// const { Sector, Empleado } = require('../../Config/db');

// async function modificarSector(id, datos) {
//   try {
//     const sector = await Sector.findByPk(id);

//     if (!sector) {
//       throw new Error('Sector no encontrado');
//     }

//     if (datos.nombre) {
//       sector.nombre_sector = datos.nombre_sector;
//     }

//     if (datos.jefe) {
//       const jefe = await Empleado.findByPk(datos.jefe);

//       if (!jefe) {
//         throw new Error('Empleado jefe no encontrado');
//       }

//       sector.jefe = jefe.id;
//     }

//     await sector.save();

//     return sector;
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = { modificarSector };
