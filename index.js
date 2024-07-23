/*
************************* RECORDATORIO IMPORTANTE PARA MI *************************************************
  Tengo que sibir a git el proyecto con las funcioens de carga de datos habilitadas y la opcion force de 
  sync en true para que reinicie la sincronizacion con la base de datos. Mientras estas configuraciones 
  esten asi no debo levantar la app en local porque puedo modificar mi db local. Una vez que verifico que 
  funciona en produccion puedo volver a cambiar las configuraciones de sincronizacion (Nota: deberia agi-
  lizar eso) y volver a sibir a git sin modificar la base.
************************************************************************************************************
*/ 


const server = require('./src/server')
const { conn } = require('./src/Config/db');
const { crearRegistrosLicenciaYVacaciones } = require('./src/util/IniciarTiposDeLicencias')
const { iniciarDatos } = require('./src/util/IniciarDatosDePrueba')

const port = process.env.PORT || 3001;

const startServer = async () => {
    const start = performance.now();
    await conn.sync({ force: true });
    const end = performance.now();
    const syncTimeInSeconds = (end - start) / 1000;

    server.listen(port, async () => {
        await crearRegistrosLicenciaYVacaciones()
        console.log(`Server corriendo en el puerto ${port}`)
        console.log(`Tiempo de sincronización de la base de datos: ${syncTimeInSeconds} segundos`);
        await iniciarDatos().then(() => {
        })
    });
};

startServer();
