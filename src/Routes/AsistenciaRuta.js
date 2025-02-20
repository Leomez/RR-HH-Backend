const { Router } = require("express")
const { 
    GetRegistroController, 
    FinDePausaController, 
    IngresoController, 
    SalidaController, 
    InicioDePausaController
} = require('../Controllers/Asistencia/AsistenciaControllers')

const router = Router()


router.get('/:id', GetRegistroController)
router.post('/ingreso', IngresoController)
router.post('/salida', SalidaController)
router.post('/inicioDePausa', InicioDePausaController)
router.post('/finDePausa', FinDePausaController)


module.exports = router

