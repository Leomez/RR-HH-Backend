// const sequelize = require("../../Config/db");
const { sequelize } = require("../../Config/db");
const { Empleado, Domicilio, Sector } = require("../../Config/db");
const { traerSector } = require("../Sector/TraerSector");


async function crearEmpleado(datos) {
    const t = await sequelize.transaction();
    
    try {
        
        const { domicilio, sector, ...datosEmpleado } = datos;

        

        // Busco domicilio o lo creo si no existe
        const [domiExistente] = await Domicilio.findOrCreate(
            {
                where: {
                    calle: domicilio.calle,
                    numero: domicilio.numero,
                    ciudad: domicilio.ciudad,
                    cod_postal: domicilio.cod_postal
                },
                transaction: t
            }
        );

        // Traigo el sector en development. 
        // En produccion deberia traer el sector por id y eleiminar este bloque.        
        
        let sect;
        sect = await traerSector(sector);

        // console.log('sector en la db -->'+ sect.data.dataValues.id);

        if (!sect.data) {
            if (sect.success === false) {
                await t.rollback();                
                return {
                    success: false,
                    mensaje: 'Error al obtener el sector',
                    error: error.message
                };
            } else {
                await t.rollback();
                return {
                    success: false,
                    mensaje: 'El sector proporcionado no existe',
                    error: 'Sector no encontrado'
                };
            }
        }
        
        // creo un empleado
        let empleado;
        try {            
            empleado = await Empleado.create({
                ...datosEmpleado,
                domicilio_id: domiExistente.dataValues.id,
                sector_id: sect.data.dataValues.id
            }, { transaction: t });
            await t.commit(); // confirmar la transaccion
        } catch (error) {
            console.error('Error al crear el empleado: ',error)    
        }
        // console.log(empleado);

        return {
            success: true,
            mensaje: 'Empleado creado con exito',
            data: empleado.dataValues
        };

    } catch (error) {
        await t.rollback(); // revertir la transaccion
        return {
            success: false,
            mensaje: 'Error al crear el empleado',
            error: error.message
        };
    }
}

module.exports = { crearEmpleado };