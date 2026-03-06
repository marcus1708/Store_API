const ListaCompras = require('../models/ListaCompras');
const Usuario = require('../models/Usuario');
const Produto = require('../models/Produto');
const Loja = require('../models/Loja');

module.exports = {
    async store(req, res) {
        try {
            const { id_user, id_loja, id_prod, quantidade, preco } = req.body;

            // 1. Validação de campos obrigatórios e valores positivos
            if (!id_user || !id_loja || !id_prod || quantidade <= 0 || preco < 0) {
                return res.status(400).json({ message: "Preencha todos os campos e uma quantidade válida" });
            }

            // 2. Verificação se o Usuário, Loja e Produto realmente existem no banco
            const [usuarioExiste, lojaExiste, produtoExiste] = await Promise.all([
                Usuario.findById(id_user),
                Loja.findById(id_loja),
                Produto.findById(id_prod)
            ]);

            if (!usuarioExiste || !lojaExiste || !produtoExiste) {
                return res.status(404).json({ 
                    message: "Um ou mais IDs (Usuario, Loja ou Produto) não foram encontrados no sistema" 
                });
            }

            // 3. Regra: Não permitir item repetido na lista (mesmo user, loja e produto)
            const existeItem = await ListaCompras.findOne({ id_user, id_loja, id_prod });
            if (existeItem) {
                return res.status(404).json({ message: "Dados já existentes" });
            }

            // 4. Criação do item após todas as validações
            const item = await ListaCompras.create({ id_user, id_loja, id_prod, quantidade, preco });

            return res.status(201).json({
                _id: item._id,
                message: "Lista gerada com sucesso"
            });
        } catch (err) {
            return res.status(400).json({ message: "Lista nao criada" });
        }
    },

    async index(req, res) {
        try {
            const lista = await ListaCompras.find()
                .populate('id_user', 'id do usuario')
                .populate('id_loja', 'id da loja')
                .populate('id_prod', 'id do produto');

            return res.status(200).json({
                message: "Listagem de todas as listas realizadas",
                lista
            });
        } catch (err) {
            return res.status(400).json({ message: "Erro ao buscar lista" });
        }
    },

    async show(req, res) {
        try {
            const item = await ListaCompras.findById(req.params.id).populate('id_user id_loja id_prod');
            if (!item) return res.status(400).json({ message: "Lista nao encontrada" });
            return res.status(200).json({ message: "Lista encontrada", item });
        } catch (err) {
            return res.status(400).json({ message: "Lista nao encontrada" });
        }
    },

    async update(req, res) {
        try {
            const item = await ListaCompras.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!item) return res.status(400).json({ message: "Lista nao atualizada" });
            return res.status(200).json({ message: "Dados da lista atualizadas" });
        } catch (err) {
            return res.status(400).json({ message: "Lista nao atualizada" });
        }
    },

    async patch(req, res) {
        try {
            const item = await ListaCompras.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            if (!item) return res.status(400).json({ message: "Lista nao atualizada" });
            return res.status(200).json({ message: "Dados da lista atualizadas" });
        } catch (err) {
            return res.status(400).json({ message: "Lista nao atualizada" });
        }
    },

    async destroy(req, res) {
        try {
            const item = await ListaCompras.findByIdAndDelete(req.params.id);
            if (!item) return res.status(400).json({ message: "Lista nao deletada" });
            return res.status(200).json({ message: "Lista excluida" });
        } catch (err) {
            return res.status(400).json({ message: "Lista nao deletada" });
        }
    }
};