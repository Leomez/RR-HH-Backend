const { admin } = require('../Firebase/firebase');

async function AuthToken(req, res, next) {
    try {
        // console.log(req.headers);

        // Verificar si existe la cabecera 'authorization' y es diferente de undefined
        if (req.headers.authorization && req.headers.authorization.split(' ')[1]) {
            const token = req.headers.authorization.split(' ')[1];
            console.log('validando token de autorizacion...');
            const decodedToken = await admin.auth().verifyIdToken(token);
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
        res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = { AuthToken };
