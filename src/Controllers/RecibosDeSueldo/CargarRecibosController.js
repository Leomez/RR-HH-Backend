const { CargaSimple } = require("../../Services/Recibos_de_sueldo/CargaSimple");
const {
  CargarVarios,
} = require("../../Services/Recibos_de_sueldo/CargarVarios");

async function CargarRecibosController(req, res) {

  // console.log(req)
  if (req.tipoSolicitud === "compuesta") {
   
    try {
      const resultado = await CargarVarios(req.empleados);
      console.log(resultado);
      if (resultado.success) {
        res.status(200).json({
          success: resultado.success,
          message: resultado.message,
        });        
      } else {
        res.status(500).json({
          success: resultado.success,
          message: resultado.message,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  } else if (req.tipoSolicitud === "simple") {
    const { periodo, monto, id_empleado, reciboDesc } = await req.datos;
    const recibo = await req.file;
    const data = {
      periodo,
      monto,
      id_empleado,
      reciboDesc,
      recibo,
    };
    // console.log(data);
    try {
      const resultado = await CargaSimple(data);
      // console.log(resultado);
      res.status(200).json({
        success: resultado.success,
        message: resultado.message,
      });
      // res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = { CargarRecibosController };
