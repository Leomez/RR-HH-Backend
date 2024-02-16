const server = require('./src/server')
const { conn } = require('./src/Config/db');
// const { iniciarDatos } = require('./src/util/IniciarDatosDePrueba')

const port = process.env.PORT || 3001;

const startServer = async () => {
    const start = performance.now();
    await conn.sync({ force: false });
    const end = performance.now();
    const syncTimeInSeconds = (end - start) / 1000;

    server.listen(port, async () => {
        console.log(`Server corriendo en el puerto ${port}`)
        console.log(`Tiempo de sincronización de la base de datos: ${syncTimeInSeconds} segundos`);
        
        // await iniciarDatos().then(() => {
        // })
    });
};

startServer();
