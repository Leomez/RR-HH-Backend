const { Router } = require('express');
const router = Router();

const { TraerDomicilios } = require('../Controllers/Domicilio/TraerDomicilioController')

router.get('/', TraerDomicilios)

module.exports = router