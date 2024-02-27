
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

const sequelizePgUrl = new Sequelize(`${PG_URL}`,{
    logging: (...msg) => console.log(msg),
})

function conexion(db) {
    switch (db) {
        case "USE_POSTGRES_BACKUP":
            return sequelizePostgres 
        case "USE_POSTEGRES_URL":
            return sequelizePgUrl
        default:
            return sequelizeMySQL
    }
} 

module.exports = {conexion}