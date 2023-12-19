const { Router } = require('express');
const router = Router();

const { NuevoSector, ModificarSector, TraerSector, TraerSectorXId } = require('../Controllers/Sector/SectorController');

router.get('/', TraerSector)
router.get('/:id', TraerSectorXId)
router.post('/', NuevoSector);

// router.put('/:id', ModificarSector);


module.exports = router;

