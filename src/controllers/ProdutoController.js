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

        // Verifica se o produto está vinculado
        // a alguma lista ATIVA

        const vinculado = await ListaCompras.findOne({
            id_prod: req.params.id,
            status: 'ATIVA'
        });

        if (vinculado) {

            return res.status(409).json({
                message:
                    'Não é permitido excluir um produto vinculado a uma lista ativa'
            });
        }

        const produto =
            await Produto.findByIdAndDelete(
                req.params.id
            );

        if (!produto) {

            return res.status(404).json({
                message: 'Produto não encontrado'
            });
        }

        return res.status(200).json({
            message: 'Produto excluído com sucesso'
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: 'Erro interno ao excluir produto'
        });
    }
  }
};