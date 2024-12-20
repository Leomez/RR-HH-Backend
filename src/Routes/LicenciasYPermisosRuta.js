const { Router } = require('express')
const router = Router()
const { crearTipoSolicitud } = require('../Controllers/Solicitud/TipoSolicitud/CrearTipoSolicitudController')
const { traerTipoSolicitud } = require('../Controllers/Solicitud/TipoSolicitud/TraerTipoSolicitudController')
const { crearSolicitudController } = require('../Controllers/Solicitud/Solicitud/CrearSolicitudController')
const {
    getSolicitudController,
    getSolicitudElevadaController,
    getSolicitudEmpleadoController,
    getAllSolicitudesController
} = require('../Controllers/Solicitud/Solicitud/GetSolicitudController')
const { getTipoLicencias } = require('../Controllers/VacacionesYLicencias/Tipos/getTipoLicenciasController')
const { getTipoVacaciones } = require('../Controllers/VacacionesYLicencias/Tipos/getTipoVacacionesController')
const { responderSolicitudController } = require('../Controllers/Solicitud/Solicitud/ResponderSolicitudController')
const { getLicenciaDisponibleXEmpleadoController } = require('../Controllers/VacacionesYLicencias/Licencias/getLicenciaDisponibleXEmpleadoController')
const { getVacacionesDisponiblesXEmpleadoController } = require('../Controllers/VacacionesYLicencias/Licencias/getVacacionesDisponiblesXEmpleadoController')

console.log('estoy en la ruta de licencias y permisos');

//ruta para crear tipo de solicitud
router.post('/crearTipoSolicitud', crearTipoSolicitud)
//ruta para crear solicitud
router.post('/crearSolicitud', crearSolicitudController)
//ruta para autorizar y rechazar
router.put('/responderSolicitud/:solicitudId', responderSolicitudController)
//get para tipos
router.get('/traerTipoSolicitud', traerTipoSolicitud)
router.get('/getTiposLicencias', getTipoLicencias)
router.get('/getTipoVacaciones', getTipoVacaciones)
//get para traer todas las solicitudes
router.get('/getAllSolicitudes', getAllSolicitudesController)
//get para el supervisor
router.get('/getSolicitudAlSuper', getSolicitudController)
//get para el jefe de RRHH 
router.get('/getSolicitudElevada', getSolicitudElevadaController)
//get para el empleado
router.get('/getSolicitudEmpleado', getSolicitudEmpleadoController)
//get licecia x empleado
router.get('/licenciaXEmpleado/:id', getLicenciaDisponibleXEmpleadoController)
// get dias de vacaciones disponibles
router.get('/diasVacacionesXEmpleado/:id', getVacacionesDisponiblesXEmpleadoController)



module.exports = router
