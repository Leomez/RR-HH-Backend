const { Router } = require('express');
const router = Router();

const { TraerEmpleados } = require('../Controllers/Empleado/TraerEmpleadoController');
const { TraerEmpleado } = require('../Controllers/Empleado/TraerEmpleadoController');
const { NuevoEmpleado } = require('../Controllers/Empleado/NuevoEmpleadoController');
const { ActualizarEmpleado } = require('../Controllers/Empleado/ActualizarEmpleadoController')
const { EliminarEmpleado} = require('../Controllers/Empleado/EliminarEmpleadoController')

router.post('/', NuevoEmpleado);
router.get('/', TraerEmpleados);
// router.get('/:id', TraerEmpleado);
router.put('/:id', ActualizarEmpleado);
router.delete('/:id', EliminarEmpleado);

module.exports = router;