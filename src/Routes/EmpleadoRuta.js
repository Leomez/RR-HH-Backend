
const { Router } = require('express');
const router = Router();
const upload = require('../Config/storage');

const { TraerEmpleados } = require('../Controllers/Empleado/TraerEmpleadoController');
const { TraerEmpleado } = require('../Controllers/Empleado/TraerEmpleadoController');
const { NuevoEmpleado } = require('../Controllers/Empleado/NuevoEmpleadoController');
const { ActualizarEmpleado } = require('../Controllers/Empleado/ActualizarEmpleadoController')
const { EliminarEmpleado} = require('../Controllers/Empleado/EliminarEmpleadoController')

router.post('/', NuevoEmpleado);
router.get('/', TraerEmpleados);
router.get('/:id', TraerEmpleado);
router.put('/:id', upload.single('foto'), ActualizarEmpleado);
router.delete('/', EliminarEmpleado);

module.exports = router;
