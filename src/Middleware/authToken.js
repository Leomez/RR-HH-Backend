const { app } = require('../Firebase/firebase');
const { getAuth } = require('firebase-admin/auth');

const auth = getAuth(app);

async function AuthToken(req, res, next) {
    try {
        // Verificar si existe la cabecera 'authorization' y es diferente de undefined
        if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
            const token = req.headers.authorization.split(' ')[1];
            console.log('Validando token de autorización...');
            console.log('Token recibido: ', token);
            
            const decodedToken = await auth.verifyIdToken(token);
            req.token = token;
            req.user = decodedToken;
            return next();
        } else if (req.method === 'OPTIONS') {
            // Manejo solicitudes OPTIONS de manera diferente, no requiere token
            return next();
        } else {
            // No se proporcionó un token
            throw new Error('Token de autorización no proporcionado');
        }
    } catch (error) {
        console.error('Error al intentar validar el token de usuario: ', error);

        // Manejar error de token expirado específicamente
        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({
                message: 'El token de autorización ha expirado. Vuelve a iniciar sesión.'
            });
        }

        // Manejar otros errores
        return res.status(401).json({
            message: 'Token inválido o no autorizado',
            error: error.message
        });
    }
}

module.exports = { AuthToken };


// console.log(req.query, '<-- req.query');    
    // const usuarioAuxiliar = {
    //     displayName: "Leonardo Ariel Meza",
    //     email:"leoariel17@gmail.com",
    //     phoneNumber:null,
    //     photoURL:"https://lh3.googleusercontent.com/a/ACg8ocLUtnfKrDwTlNoTMaq1iruC5e-643CP4ZPn96VhmCgUyxHFxC-l=s96-c",
    //     providerId:"google.com",
    //     uid:"nfD6ALab2mha89rVuX8Q3gsSyFY2"
    // }