const { getDiasPendientes } = require("../../../Services/VacacionesXEmpleado/VacacionesXEmpleado") ;
const { catchAsync } = require("../../../Middleware/catchAsync");

const getVacacionesDisponiblesXEmpleadoController = async (req, res) => {
    const { id } = req.params

    const response = await getDiasPendientes(id)
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

// module.exports = {getVacacionesDisponiblesXEmpleadoController}
module.exports = { getVacacionesDisponiblesXEmpleadoController: catchAsync(getVacacionesDisponiblesXEmpleadoController) }