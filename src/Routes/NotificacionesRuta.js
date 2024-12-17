const { Router } = require('express')
const router = Router()
const { obtenerNotificaciones } = require('../Controllers/Notificaciones/ObtenerNotificacionesController')
const { deleteNotificacionesController } = require('../Controllers/Notificaciones/DeleteNotificacionesController')
const { updateNotificacionesController } = require('../Controllers/Notificaciones/UpdateNotificacionesController')


router.get('/:id', obtenerNotificaciones)
router.delete('/:id', deleteNotificacionesController )
router.put('/:id', updateNotificacionesController )

module.exports = router
