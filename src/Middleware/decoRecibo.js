

function decoRecibo(req, res, next) {
    // Accede a los archivos subidos directamente antes de req.body
    // const archivosSubidos = req.files.map(f => 
    //     {return f.name});
    const {periodo, monto, id_empleado, reciboDesc, unSoloRecibo } = req.body;
    // const archivo = req.file
    if (unSoloRecibo) {
        req.datos = {
            periodo,
            monto,
            id_empleado,
            reciboDesc,
            // recibo: archivo
        }
        req.tipoSolicitud = "simple"
        return next();
               
    } else {
        const datos = req.body
        const fis = req.files
        const empleados = []    
        req.tipoSolicitud = "compuesta"
        
        for (let key in datos) {
            const empleado = {
                id_empleado: datos[key].id_empleado,
                periodo: datos[key].periodo,
                recibo: fis.find(file => file.fieldname === `${key}[recibo]`)
            };
            empleados.push(empleado);
        }
        req.empleados = empleados;
        return next()
        // console.log(empleados);

        // console.log(datos)
        // console.log(fis);
        
    }
    
        
}

module.exports = { decoRecibo };
