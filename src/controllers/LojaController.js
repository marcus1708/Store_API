const Loja = require('../models/Loja');
const ListaCompras = require('../models/ListaCompras');

module.exports = {
    async store(req, res) {
        try {
            // Regra: Não permitir duplicados
            const { nome } = req.body;
            const existe = await Loja.findOne({ nome });
            if (existe) {
                return res.status(404).json({ message: "Dados já existentes" });
            }

            const loja = await Loja.create(req.body);
            return res.status(201).json({
                _id: loja._id,
                message: "Loja gerada com sucesso" 
            });
        } catch (err) {
            return res.status(400).json({ message: "Loja nao criada" });
        }
    },

    async index(req, res) {
        try {
            const lojas = await Loja.find();
            return res.status(200).json({
                message: "Listagem de todas as lojas realizadas",
                lojas
            });
        } catch (err) {
            return res.status(400).json({ message: "Erro ao listar lojas" });
        }
    },

    async show(req, res) {
        try {
            const loja = await Loja.findById(req.params.id);
            if (!loja) return res.status(400).json({ message: "Loja nao encontrada" });
            return res.status(200).json({ message: "Loja encontrada", loja });
        } catch (err) {
            return res.status(400).json({ message: "Loja nao encontrada" });
        }
    },

    async update(req, res) {
        try {
            const loja = await Loja.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!loja) return res.status(400).json({ message: "Loja nao atualizada" });
            return res.status(200).json({ message: "Dados do loja atualizadas" });
        } catch (err) {
            return res.status(400).json({ message: "Loja nao atualizada" });
        }
    },

    async patch(req, res) {
        try {
            const loja = await Loja.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            if (!loja) return res.status(400).json({ message: "Loja nao atualizada" });
            return res.status(200).json({ message: "Dados do loja atualizadas" });
        } catch (err) {
            return res.status(400).json({ message: "Loja nao atualizada" });
        }
    },

    async destroy(req, res) {
        try {
            // Regra: Verificar vínculo com lista
            const vinculado = await ListaCompras.findOne({ id_loja: req.params.id });
            if (vinculado) {
                return res.status(404).json({ message: "Não é permitido excluir Usuario,produto ou loja vinculado a uma lista" });
            }

            const loja = await Loja.findByIdAndDelete(req.params.id);
            if (!loja) return res.status(400).json({ message: "Loja nao deletada" });
            return res.status(200).json({ message: "Loja excluida" });
        } catch (err) {
            return res.status(400).json({ message: "Loja nao deletada" });
        }
    }
};