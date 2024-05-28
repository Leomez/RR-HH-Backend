const { Tipo_vacaciones, Tipo_licencia, Tipo_permiso } = require('../Config/db'); // Asumiendo que los modelos están definidos en 'models.js'
const { tipoLicencias, tiposVacaciones, tipoPermisos } = require('./datosParaCargar/licenciasYVacaciones')

// Función para crear registros base para Tipo_vacaciones y Tipo_licencia

async function crearRegistrosLicenciaYVacaciones() {

  const vacas = tiposVacaciones.map(tipo => {return tipo})
  const licencias =   tipoLicencias.map(tipo => {return tipo})
  const permisos = tipoPermisos.map(tipo => {return tipo})

  
  
  // Verifica si los registros base ya existen
  const vacacionesExistentes = await Tipo_vacaciones.findAll();
  const licenciasExistentes = await Tipo_licencia.findAll();
  const permisosExistentes = await Tipo_permiso.findAll();

  // Verifica si los registros base ya existen

  if (vacacionesExistentes.length === 0) {
    // Crea registros base para Tipo_vacaciones
    await Tipo_vacaciones.bulkCreate(vacas);    
  }

  if (licenciasExistentes.length === 0) {
    // Crea registros base para Tipo_licencia
    await Tipo_licencia.bulkCreate(licencias)
  }

  if (permisosExistentes.length === 0) {
    // Crea registros base para Tipos_permiso
    await Tipo_permiso.bulkCreate(permisos)
  }

}

module.exports = { crearRegistrosLicenciaYVacaciones };
