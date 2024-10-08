const { Router } = require('express');

const Empleado = require('./EmpleadoRuta')
const Domicilio = require('./DomicilioRuta')
const Sector = require('./SectorRutas')
const Sesion = require('./SesionRuta')
const Usuario = require('./UsuarioRutas')
const Recibos = require('./RecibosRuta')
const Notificaciones = require('./NotificacionesRuta')
const Supervisor = require('./SupervisorRuta')
const Licencias = require('./LicenciasYPermisosRuta')
const Asistencia = require('./AsistenciaRuta')

const { CrearAdmin } = require('./CrearAdmin')
const { AuthToken } = require('../Middleware/authToken')
const router = Router();

router.get('/', (req, res) => {
    console.log("Acceso correcto");
    res.status(200).send('App de RR HH');
});
router.use('/crearAdmin', CrearAdmin);
router.use('/login', Sesion);
router.use('/usuario', Usuario)

router.use(AuthToken)

router.use('/empleado', Empleado);
router.use('/domicilio', Domicilio)
router.use('/sector', Sector);
router.use('/recibos', Recibos) 
router.use('/notificaciones', Notificaciones)
router.use('/supervisor', Supervisor)
router.use('/licencias', Licencias)
router.use('/asistencia', Asistencia)



module.exports = router;