const Usuario = require('../models/Usuario');
const ListaCompras = require('../models/ListaCompras');

module.exports = {
    async store(req, res) {
    try {
        const { nome, email } = req.body;

        // Validação de campos obrigatórios
        if (!nome || !email) {
            return res.status(400).json({ message: "Nome e Email são obrigatórios" });
        }

        const existe = await Usuario.findOne({ email });
        if (existe) {
            return res.status(404).json({ message: "Dados já existentes" });
        }

        const usuario = await Usuario.create(req.body);
        return res.status(201).json({ _id: usuario._id, message: "Usuario gerado com sucesso" });
        } catch (err) {
        return res.status(400).json({ message: "Usuario nao criado" });
        }
    },

    async index(req, res) {
        try {
            const usuarios = await Usuario.find();
            return res.status(200).json({
                message: "Listagem de todos os usuarios realizada",
                usuarios
            });
        } catch (err) {
            return res.status(400).json({ message: "Erro ao listar usuarios" });
        }
    },

    async show(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.id);
            if (!usuario) return res.status(400).json({ message: "Usuario nao encontrado" });
            return res.status(200).json({ message: "Usuario encontrado", usuario });
        } catch (err) {
            return res.status(400).json({ message: "Usuario nao encontrado" });
        }
    },

    async update(req, res) {
        try {
            const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!usuario) return res.status(400).json({ message: "Usuario nao atualizado" });
            return res.status(200).json({ message: "Dados do usuario atualizados" });
        } catch (err) {
            return res.status(400).json({ message: "Usuario nao atualizado" });
        }
    },

    async patch(req, res) {
        try {
            const usuario = await Usuario.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            if (!usuario) return res.status(400).json({ message: "Usuario nao atualizado" });
            return res.status(200).json({ message: "Dados do usuario atualizados" });
        } catch (err) {
            return res.status(400).json({ message: "Usuario nao atualizado" });
        }
    },

    async destroy(req, res) {
        try {
            // Regra: Verificar vínculo com lista
            const vinculado = await ListaCompras.findOne({ id_user: req.params.id });
            if (vinculado) {
                return res.status(404).json({ message: "Não é permitido excluir Usuario,produto ou loja vinculado a uma lista" });
            }

            const usuario = await Usuario.findByIdAndDelete(req.params.id);
            if (!usuario) return res.status(400).json({ message: "Usuario nao deletado" });
            return res.status(200).json({ message: "Usuario excluido" });
        } catch (err) {
            return res.status(400).json({ message: "Usuario nao deletado" });
        }
    }
};