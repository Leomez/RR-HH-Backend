const { Router } = require('express');
const multer  = require('multer')
const { decoRecibo } = require('../Middleware/decoRecibo')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/recibos')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
      // cb(null,Date.now() + '-' + file.originalname)
    }
  })

const router = Router();
const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    cb(null, true);
  } 
})

const { CargarRecibosController } = require('../Controllers/RecibosDeSueldo/CargarRecibosController');
const { ObtenerRecibosController } = require('../Controllers/RecibosDeSueldo/GetRecibosController');
const { ActualizarReciboFirmado } = require('../Controllers/RecibosDeSueldo/ActualizarRecibosController')

router.post('/CargarUnRecibo', upload.single('recibo'), decoRecibo, CargarRecibosController);
router.post('/CargarRecibos', upload.any(), decoRecibo, CargarRecibosController);
router.post('/ActualizarReciboFirmado', upload.single('archivo'), ActualizarReciboFirmado)
router.get('/obtenerRecibos/:id', ObtenerRecibosController)

module.exports = router;

