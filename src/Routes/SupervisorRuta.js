const { Router } = require('express')
const router = Router()
const { CrearSupervisorController } = require('../Controllers/Supervisor/CrearSupervisorController');
const { TraerSupervisorController } = require('../Controllers/Supervisor/TraerSupervisorController')
 
router.get('/', TraerSupervisorController)
router.post('/', CrearSupervisorController )

module.exports = router