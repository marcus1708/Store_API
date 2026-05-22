const Usuario = require('../models/Usuario');

module.exports = async (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                message: 'Token não informado'
            });
        }

        const [tipo, token] =
            authHeader.split(' ');

        if (tipo !== 'Bearer' || !token) {

            return res.status(401).json({
                message: 'Token inválido'
            });
        }

        const usuario =
            await Usuario.findById(token);

        if (!usuario) {

            return res.status(401).json({
                message: 'Usuário não autenticado'
            });
        }

        req.usuario = usuario;

        next();

    } catch (err) {

        return res.status(401).json({
            message: 'Token inválido'
        });
    }
};