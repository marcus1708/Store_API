const Produto = require('../models/Produto');
const ListaCompras = require('../models/ListaCompras');

module.exports = {
    async store(req, res) {
    try {
        const { nome, preco, quantidade } = req.body;

        // Validação de valores
        if (!nome || preco <= 0 || quantidade < 0) {
            return res.status(400).json({ message: "Dados inválidos: Verifique nome, preço e quantidade" });
        }

        const existe = await Produto.findOne({ nome });
        if (existe) {
            return res.status(404).json({ message: "Dados já existentes" });
        }

        const produto = await Produto.create(req.body);
        return res.status(201).json({ _id: produto._id, message: "Produto gerado com sucesso" });
        } catch (err) {
        return res.status(400).json({ message: "Produto nao criado" });
        }
    },

    async index(req, res) {
        try {
            const produtos = await Produto.find();
            return res.status(200).json({
                message: "Listagem de todos os produtos realizada",
                produtos
            });
        } catch (err) {
            return res.status(400).json({ message: "Erro ao listar produtos" });
        }
    },

    async show(req, res) {
        try {
            const produto = await Produto.findById(req.params.id);
            if (!produto) return res.status(400).json({ message: "Produto nao encontrado" });
            return res.status(200).json({ message: "Produto encontrado", produto });
        } catch (err) {
            return res.status(400).json({ message: "Produto nao encontrado" });
        }
    },

    async update(req, res) {
        try {
            const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!produto) return res.status(400).json({ message: "Produto nao atualizado" });
            return res.status(200).json({ message: "Dados do produto atualizados" });
        } catch (err) {
            return res.status(400).json({ message: "Produto nao atualizado" });
        }
    },

    async patch(req, res) {
        try {
            const produto = await Produto.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            if (!produto) return res.status(400).json({ message: "Produto nao atualizado" });
            return res.status(200).json({ message: "Dados do produto atualizados" });
        } catch (err) {
            return res.status(400).json({ message: "Produto nao atualizado" });
        }
    },

    async destroy(req, res) {
        try {
            // Regra: Verificar vínculo com lista
            const vinculado = await ListaCompras.findOne({ id_prod: req.params.id });
            if (vinculado) {
                return res.status(404).json({ message: "Não é permitido excluir Usuario,produto ou loja vinculado a uma lista" });
            }

            const produto = await Produto.findByIdAndDelete(req.params.id);
            if (!produto) return res.status(400).json({ message: "Produto nao deletado" });
            return res.status(200).json({ message: "Produto excluido" });
        } catch (err) {
            return res.status(400).json({ message: "Produto nao deletado" });
        }
    }
};