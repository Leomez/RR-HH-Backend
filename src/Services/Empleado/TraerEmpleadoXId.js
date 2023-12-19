const { Op } = require("sequelize");
const { Empleado } = require("../../Config/db");

async function TraerEmpleadoXId(EmpleadoId)  {
    try {
        console.log("EmpleadoId",EmpleadoId);
    } catch (error) {
        
    }
}

module.exports = {
    TraerEmpleadoXId
};