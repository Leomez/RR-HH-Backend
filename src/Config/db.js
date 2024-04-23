
require('dotenv').config()
const { Op, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');
const { conexion } = require('./conexion')

//defino una variable para usar el backup de postgre
const usePostgresBackup = process.env.USE_PG_BACKUP === 'true';
const useUrl = process.env.USE_PG_URL === 'true';
const sequelize = conexion(usePostgresBackup ? "USE_POSTGRES_BACKUP" : useUrl ? "USE_POSTEGRES_URL" : "default")
const basename = path.basename(__filename);
const modelDefiners = []
// console.log(sequelize)

//Leo todos los archivos de la carpeta Models, los requiero y agrego al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '../Models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '../Models', file)));
    })

//Injecto la conexion (sequelize) a cada uno los modelos
// console.log(modelDefiners);
modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

//en sequelize estan todos los modelos importados como propiedades
//para relacionarlos hago un destructuring
const { Domicilio, Tipo_de_solicitud, Sector, Empleado, Supervisor, Comun_int, Comun_int_empl, Solicitud, Certificado, Puesto, Recibo_de_sueldo, Solicitud_de_puesto, Usuario, Asistencia } = sequelize.models;

// definicion de relaciones
Domicilio.hasMany(Empleado, { foreignKey: 'domicilio_id' });
Empleado.belongsTo(Domicilio, { foreignKey: 'domicilio_id' });

Sector.hasMany(Empleado, { foreignKey: 'sector_id' });
Empleado.belongsTo(Sector, { foreignKey: 'sector_id' });

Empleado.hasOne(Supervisor);//un empleado tiene un cargo de supervisor
Supervisor.belongsTo(Empleado);//un cargo de supervisor puede pertenecer a varios empleados(puede ser un supervisor por turno)

Sector.hasMany(Supervisor);
Supervisor.belongsTo(Sector);

Empleado.hasMany(Solicitud, { as: 'empleado', foreignKey: 'empleado_id'});
Solicitud.belongsTo(Empleado, { as: 'empleado', foreignKey: 'empleado_id'});

Supervisor.hasMany(Solicitud, { as: 'supervisor', foreignKey: 'supervisor_id' });
Solicitud.belongsTo(Supervisor, {as : 'supervisor', foreignKey: 'supervisor_id' })

Tipo_de_solicitud.hasMany(Solicitud, { foreignKey: 'tipo_de_solicitud_id' });//un tipo de solicitud aparece en muchos registros de solicitud
Solicitud.belongsTo(Tipo_de_solicitud, { foreignKey: 'tipo_de_solicitud_id'})//solicitud se refiere a un tipo de licencia o permiso

Solicitud.hasMany(Certificado, { foreignKey: 'solicitud_id'});
Certificado.belongsTo(Solicitud, {foreignKey: 'solicitud_id'});

Sector.hasMany(Puesto);
Puesto.belongsTo(Sector);//puesto se refiere a posicion para busqueda de candidato

Comun_int.belongsToMany(Empleado, { through: Comun_int_empl });
Empleado.belongsToMany(Comun_int, { through: Comun_int_empl });


Puesto.hasMany(Solicitud_de_puesto);
Solicitud_de_puesto.belongsTo(Puesto);

// Sector.hasMany(Puesto);
// Puesto.belongsTo(Sector);

// Tipo_de_licencia.hasMany(Licencia);
// Licencia.belongsTo(Tipo_de_licencia);

// Solicitud.hasOne(Licencia);
// Licencia.belongsTo(Solicitud);

Empleado.hasMany(Recibo_de_sueldo);
Recibo_de_sueldo.belongsTo(Empleado);

Empleado.hasOne(Usuario)
Usuario.belongsTo(Empleado);

Empleado.hasMany(Asistencia)
Asistencia.belongsTo(Empleado);


module.exports = {
    ...sequelize.models,  // models {Domicilio, Empleado, Permiso, etc...}
    conn: sequelize, // connection
    Op, // operation
    sequelize  //sequelize
};