const { Router } = require('express')
const router = Router()
const {crearTipoSolicitud} = require('../Controllers/Solicitud/TipoSolicitud/CrearTipoSolicitudController')
const {traerTipoSolicitud} = require('../Controllers/Solicitud/TipoSolicitud/TraerTipoSolicitudController')
const {crearSolicitudController} = require('../Controllers/Solicitud/Solicitud/CrearSolicitudController')
const {getSolicitudController, getSolicitudElevadaController, getSolicitudEmpleadoController} = require('../Controllers/Solicitud/Solicitud/GetSolicitudController')
const {getTipoLicencias} = require('../Controllers/VacacionesYLicencias/Tipos/getTipoLicenciasController')
const {getTipoVacaciones} = require('../Controllers/VacacionesYLicencias/Tipos/getTipoVacacionesController')
const {responderSolicitudController} = require('../Controllers/Solicitud/Solicitud/ResponderSolicitudController')


console.log('estoy en la ruta de licencias y permisos');
router.post('/crearTipoSolicitud', crearTipoSolicitud)
router.post('/crearSolicitud', crearSolicitudController)
router.put('/responderSolicitud/:solicitudId', responderSolicitudController)
router.get('/traerTipoSolicitud', traerTipoSolicitud)
router.get('/getSolicitud', getSolicitudController)
router.get('/getTiposLicencias', getTipoLicencias)
router.get('/getTipoVacaciones', getTipoVacaciones)
router.get('/getSolicitudElevada', getSolicitudElevadaController)
router.get('/getSolicitudEmpleado', getSolicitudEmpleadoController)



module.exports = router
