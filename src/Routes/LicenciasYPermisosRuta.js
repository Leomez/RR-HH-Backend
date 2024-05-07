const { Router } = require('express')
const router = Router()
const {crearTipoSolicitud} = require('../Controllers/Solicitud/TipoSolicitud/CrearTipoSolicitudController')
const {traerTipoSolicitud} = require('../Controllers/Solicitud/TipoSolicitud/TraerTipoSolicitudController')
const {crearSolicitudController} = require('../Controllers/Solicitud/Solicitud/CrearSolicitudController')
// const {getSolicitud} = require('../Controllers/Solicitud/Solicitud/CrearSolicitudController')
// const { crearSolicitud } = require('../Controllers/Solicitud/Solicitud/CrearSolicitudController')

console.log('estoy en la ruta de licencias y permisos');
router.get('/traerTipoSolicitud', traerTipoSolicitud)
router.post('/crearTipoSolicitud', crearTipoSolicitud)
router.post('/crearSolicitud', crearSolicitudController)
// router.get('/getSolicitud', getSolicitud)


module.exports = router
