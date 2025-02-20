
require('dotenv').config
const { Sequelize } = require('sequelize')

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    PG_DB_NAME,
    PG_DB_USER,
    PG_DB_PASSWORD,
    PG_DB_HOST,
    PG_DB_PORT,
    PG_URL
} = process.env;


const sequelizePostgres = new Sequelize(`${PG_DB_NAME}`, `${PG_DB_USER}`, `${PG_DB_PASSWORD}`, {
    host: `${PG_DB_HOST}`,
    port: `${PG_DB_PORT}`,
    dialect: 'postgres',
    ssl: false,
    logging: false, //setea el console.log de las querys en false para evitar ruido de consola
    define: {
        freezeTableName: true //evita que sequelize modifique los nombres de las tablas
    },
    pool: {
        max: 10, // Número máximo de conexiones en el pool
        min: 1,  // Número mínimo de conexiones en el pool
        acquire: 30000,
        idle: 10000,
    },
});

// const sequelizePostgres = new Sequelize(`${PG_URL}`, {   
//     ssl: false,
//     logging: false, //setea el console.log de las querys en false para evitar ruido de consola
//     define: {
//         freezeTableName: true //evita que sequelize modifique los nombres de las tablas
//     },
//     pool: {
//         max: 10, // Número máximo de conexiones en el pool
//         min: 1,  // Número mínimo de conexiones en el pool
//         acquire: 30000,
//         idle: 10000,
//     },
// });


const sequelizeMySQL = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
    host: `${DB_HOST}`,
    port: `${DB_PORT}`,
    dialect: 'mysql',
    logging: false, //setea el console.log de las querys en false para evitar ruido de consola
    define: {
        freezeTableName: true //evita que sequelize modifique los nombres de las tablas
    },
    pool: {
        max: 10, // Número máximo de conexiones en el pool
        min: 0,  // Número mínimo de conexiones en el pool
        acquire: 30000,
        idle: 10000,
    },
});

const sequelizePgUrl = new Sequelize(`${PG_URL}`, {
    // logging: (...msg) => console.log(msg),
    logging: false,    
    dialectOptions: {
        ssl: {
            require: false, // Asegurarse de que SSL/TLS esté requerido
            rejectUnauthorized: false // Puedes ajustar esto según tus necesidades de seguridad
        }
    },
    define: {
        freezeTableName: true
    },
    pool: {
        max: 10, // Número máximo de conexiones en el pool
        min: 0, // Número mínimo de conexiones en el pool
        acquire: 60000, // Tiempo máximo de espera para adquirir una conexión (en milisegundos)
        idle: 20000 // Tiempo máximo que una conexión puede estar inactiva antes de ser liberada (en milisegundos)
      }    

})

function conexion(db) {
    switch (db) {
        case "USE_POSTGRES_BACKUP":
            {
                console.log(`host ${PG_DB_HOST}`);  
                console.log(`port ${PG_DB_PORT}`);
                console.log('name', PG_DB_NAME);
                console.log('user', PG_DB_USER);
                return sequelizePostgres
            }
        case "USE_POSTEGRES_URL":
            return sequelizePgUrl
        default:
            {
                console.log(`host ${DB_HOST}`);
                console.log(`port ${DB_PORT}`);
                console.log(`password ${DB_PASSWORD}`);
                console.log(`user ${DB_USER}`);
                console.log(`name ${DB_NAME}`);
                return sequelizeMySQL
            }
    }
}

module.exports = { conexion }