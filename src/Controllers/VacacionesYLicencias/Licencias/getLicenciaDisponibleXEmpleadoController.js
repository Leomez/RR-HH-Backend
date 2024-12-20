const { catchAsync } = require('../../../Middleware/catchAsync')
const { getLicenciaDisponibleXEmpleadoService } = require('../../../Services/VacacionesYLicencias/Licencias/getLicenciaDisponibleXEmpleadoService')

const getLicenciaDisponibleXEmpleadoController = async (req, res) => {
    const { id } = req.params

    const response = await getLicenciaDisponibleXEmpleadoService(id)
    if (!response.success) {
        res.status(response.status).json({
            success: response.success,
            message: response.message,
            data: response.data
        })
    } else {
        res.status(response.status).json({
            success: response.success,
            data: response.data,
            message: response.message,
            error: response.error
        })
    }     

}

module.exports = { getLicenciaDisponibleXEmpleadoController:catchAsync(getLicenciaDisponibleXEmpleadoController) }
