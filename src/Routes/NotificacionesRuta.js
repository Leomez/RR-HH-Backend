const { Router } = require('express')
const router = Router()
const { obtenerNotificaciones } = require('../Controllers/Notificaciones/ObtenerNotificacionesController')


router.get('/:id', obtenerNotificaciones)

module.exports = router
