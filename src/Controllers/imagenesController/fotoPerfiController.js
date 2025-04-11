
async function mostrarFotoController(req, res) {
    const { id } = req.params;
    const { Empleado } = require('../../Config/db');
    try {
        const empleado = await Empleado.findByPk(id);
        if (!empleado) {
            return res.status(404).json({
                success: false,
                message: 'Empleado no encontrado',
            });
        }
        res.status(200).json(
            <img src={empleado.foto} alt="Foto de perfil" style={{ width: '100px', height: '100px' }} />
        );
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    
}

module.exports = { mostrarFotoController };