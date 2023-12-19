const { obtenerRecibosDeSueldo } = require('../../Services/Recibos_de_sueldo/GetRecibos')

async function ObtenerRecibosController(req, res) {
    const { id } = req.params;
    // console.log(req.params);
    const recibos = await obtenerRecibosDeSueldo(id);

    // console.log(recibos);
    return res.status(200).json({
        ok: true,
        recibos
    });
}

module.exports = { ObtenerRecibosController };