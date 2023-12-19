const { Router } = require("express");
const router = Router();

const { AuthToken } = require('../Middleware/authToken')

const { InicioSesionController } = require('../Controllers/Sesion/InicioSesionController');

router.post('/', AuthToken, InicioSesionController);

module.exports = router;