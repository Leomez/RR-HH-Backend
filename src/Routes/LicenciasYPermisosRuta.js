const { Router } = require('express')
const router = Router()
const {crearTipoSolicitud} = require('../Controllers/Solicitud/TipoSolicitud/CrearTipoSolicitudController')
const {traerTipoSolicitud} = require('../Controllers/Solicitud/TipoSolicitud/TraerTipoSolicitudController')

router.get('/traerTipoSolicitud', traerTipoSolicitud)
router.post('/crearTipoSolicitud', crearTipoSolicitud)

module.exports = router
