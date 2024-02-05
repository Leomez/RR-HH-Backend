const { Router } = require('express');

const Empleado = require('./EmpleadoRuta')
const Domicilio = require('./DomicilioRuta')
const Sector = require('./SectorRutas')
const Sesion = require('./SesionRuta')
const Usuario = require('./UsuarioRutas')
const Recibos = require('./RecibosRuta')
const Notificaciones = require('./Notificaciones')
const Supervisor = require('./SupervisorRuta')
const { CrearAdmin } = require('./CrearAdmin')
const { AuthToken } = require('../Middleware/authToken')
const router = Router();



router.get('/', (req, res) => {
    res.status(200).send('App de RR HH');
});
router.use('/login', Sesion);

router.use(AuthToken)

router.use('/empleado', Empleado);
router.use('/domicilio', Domicilio)
router.use('/sector', Sector);
router.use('/usuario', Usuario)
router.use('/recibos', Recibos) 
router.use('/notificaciones', Notificaciones)
router.use('/supervisor', Supervisor)
// router.use('/crearAdmin', CrearAdmin);


module.exports = router;