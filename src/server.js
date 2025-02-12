const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./Routes/index');
require('./Config/db');
const {sequelize} = require('./Config/db');
// const { bulkLicenciaXEmpleado } = require('./util/datosParaCargar/bulkLicenciaXEmpleado')

const server = express();

(async () => {
  try {
      await sequelize.authenticate();
      // await bulkLicenciaXEmpleado();
      console.log('LA CONECCION A LA BASE DE DATOS SE ESTABLECIO CORRECTAMENTE');
  } catch (error) {
      console.error('ERROR AL CONECTAR CON LA BASE DE DATOS:', error);
  }
})();

// const DOMAIN_FRONT = process.env.DOMAIN_FRONT;
// console.log(`URL del front -> ${DOMAIN_FRONT}`);

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

const origins = process.env.ALLOWED_URLS.split(',');
server.use((req, res, next) => {
  console.log(req.headers.origin)
  if (origins.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});



// AQUI VAN LOS MIDDLEWIRES
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { //en mi archivo app
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).json({
    success: false,
    message,
    error: err
  });
});

module.exports = server;
