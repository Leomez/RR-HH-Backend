const { Router } = require('express')
const router = Router()
const {crearTipoSolicitud} = require('../Controllers/Solicitud/TipoSolicitud/CrearTipoSolicitudController')
const {traerTipoSolicitud} = require('../Controllers/Solicitud/TipoSolicitud/TraerTipoSolicitudController')
const {crearSolicitudController} = require('../Controllers/Solicitud/Solicitud/CrearSolicitudController')
const {getSolicitudController} = require('../Controllers/Solicitud/Solicitud/GetSolicitudController')
const {getTipoLicencias} = require('../Controllers/VacacionesYLicencias/Tipos/getTipoLicenciasController')
const {getTipoVacaciones} = require('../Controllers/VacacionesYLicencias/Tipos/getTipoVacacionesController')



console.log('estoy en la ruta de licencias y permisos');
router.get('/traerTipoSolicitud', traerTipoSolicitud)
router.post('/crearTipoSolicitud', crearTipoSolicitud)
router.post('/crearSolicitud', crearSolicitudController)
router.get('/getSolicitud', getSolicitudController)
router.get('/getTiposLicencias', getTipoLicencias)
router.get('/getTipoVacaciones', getTipoVacaciones)


module.exports = router
