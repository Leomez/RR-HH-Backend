const { Router } = require('express');
const router = Router();



const { RegistrarUsuario } = require('../Controllers/Usuario/RegistrarUsuarioController')

router.post('/registro', RegistrarUsuario )
 
module.exports = router