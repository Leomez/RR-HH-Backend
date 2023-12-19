const { admin } = require('../Firebase/firebase')

async function AuthToken(req, res, next) {
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;      
        return next()
    } catch (error) {
        console.error('Error al intentar validar el token de usuario: ', error);
        res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = { AuthToken }