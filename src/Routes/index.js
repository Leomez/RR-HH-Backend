const { Router } = require('express');

const Empleado = require('./EmpleadoRuta')
const Sector = require('./SectorRutas')
const Sesion = require('./SesionRuta')
const Usuario = require('./UsuarioRutas')
const Recibos = require('./RecibosRuta')
const Notificaciones = require('./Notificaciones')
const router = Router();

router.use('/empleado', Empleado);
router.use('/sector', Sector);
router.use('/login', Sesion);
router.use('/usuario', Usuario)
router.use('/recibos', Recibos) 
router.use('/notificaciones', Notificaciones)

router.get('/', (req, res) => {
    res.status(200).send('App de RR HH');
});

module.exports = router;