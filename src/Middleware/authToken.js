// const { admin } = require('../Firebase/firebase');
const { app } = require('../Firebase/firebase');
const { getAuth } = require('firebase-admin/auth');
// const app = initializeApp()
const auth  = getAuth(app)




async function AuthToken(req, res, next) {
    console.log(req.body.data);
    const usuarioAuxiliar = {
        displayName: "Leonardo Ariel Meza",
        email:"leoariel17@gmail.com",
        phoneNumber:null,
        photoURL:"https://lh3.googleusercontent.com/a/ACg8ocLUtnfKrDwTlNoTMaq1iruC5e-643CP4ZPn96VhmCgUyxHFxC-l=s96-c",
        providerId:"google.com",
        uid:"nfD6ALab2mha89rVuX8Q3gsSyFY2"
    }
    try {
        // console.log(req.headers.authorization);
        // console.log(req.headers.authorization.split(' ')[1]);
        // Verificar si existe la cabecera 'authorization' y es diferente de undefined
        if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
            const token = req.headers.authorization.split(' ')[1];
            console.log('validando token de autorizacion...');
            console.log(Date())
            // const decodedToken = await admin.auth().verifyIdToken(token);
            const decodedToken = await auth.verifyIdToken(token);
            req.token = token;
            req.user = decodedToken;
            return next();
        } else if (req.method === 'OPTIONS') {
            // Manejar solicitudes OPTIONS de manera diferente, no requerir token
            return next();
        } else {
            // No se proporcionó un token en otras solicitudes
            throw new Error('Token de autorización no proporcionado');
        }
    } catch (error) {
        console.error('Error al intentar validar el token de usuario: ', error);
        req.token = req.headers.authorization.split(' ')[1];
        req.user = usuarioAuxiliar;
        return next();
        // res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = { AuthToken };
