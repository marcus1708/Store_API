const Usuario = require('../models/Usuario');

module.exports = {

    async login(req, res) {

        try {

            const { email, senha } = req.body;

            if (!email || !senha) {

                return res.status(400).json({
                    message: 'Email e senha são obrigatórios'
                });
            }

            const usuario = await Usuario.findOne({
                email,
                senha
            });

            if (!usuario) {

                return res.status(401).json({
                    message: 'Email ou senha inválidos'
                });
            }

            return res.status(200).json({
                message: 'Login realizado com sucesso',
                token: `Bearer ${usuario._id}`
            });

        } catch (err) {

            return res.status(500).json({
                message: 'Erro ao realizar login'
            });
        }
    }
};