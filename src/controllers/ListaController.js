const ListaCompras = require('../models/ListaCompras');
const Usuario = require('../models/Usuario');
const Produto = require('../models/Produto');
const Loja = require('../models/Loja');

const LIMITE_ITENS_LISTA = 100;

module.exports = {

    async store(req, res) {

        try {

            const {
                id_user,
                id_loja,
                id_prod,
                quantidade,
                preco
            } = req.body;

            // Validação dos campos obrigatórios

            if (
                !id_user ||
                !id_loja ||
                !id_prod ||
                !quantidade ||
                quantidade <= 0 ||
                preco < 0
            ) {
                return res.status(400).json({
                    message: 'Preencha todos os campos e informe valores válidos'
                });
            }

            // Verifica existência dos relacionamentos

            const [
                usuarioExiste,
                lojaExiste,
                produtoExiste
            ] = await Promise.all([
                Usuario.findById(id_user),
                Loja.findById(id_loja),
                Produto.findById(id_prod)
            ]);

            if (
                !usuarioExiste ||
                !lojaExiste ||
                !produtoExiste
            ) {
                return res.status(404).json({
                    message:
                        'Um ou mais IDs (Usuario, Loja ou Produto) não foram encontrados no sistema'
                });
            }

            // ==================================================
            // REGRA 7
            // Limite máximo de 100 produtos na lista
            // ==================================================

            const quantidadeItens =
                await ListaCompras.countDocuments({
                    id_user,
                    id_loja
                });

            if (quantidadeItens >= LIMITE_ITENS_LISTA) {

                return res.status(400).json({
                    message:
                        `Limite máximo de ${LIMITE_ITENS_LISTA} itens na lista atingido`
                });
            }

            // ==================================================
            // REGRA 8
            // Produto repetido soma quantidade
            // ==================================================

            const itemExistente =
                await ListaCompras.findOne({
                    id_user,
                    id_loja,
                    id_prod
                });

            if (itemExistente) {

                itemExistente.quantidade += quantidade;

                await itemExistente.save();

                return res.status(200).json({
                    _id: itemExistente._id,
                    quantidade: itemExistente.quantidade,
                    message:
                        'Produto já existente na lista. Quantidade atualizada com sucesso'
                });
            }

            // Criação normal

            const item = await ListaCompras.create({
                id_user,
                id_loja,
                id_prod,
                quantidade,
                preco
            });

            return res.status(201).json({
                _id: item._id,
                message: 'Item adicionado à lista com sucesso'
            });

        } catch (err) {

            console.error(err);

            return res.status(500).json({
                message: 'Erro interno ao criar item da lista'
            });
        }
    },

    async index(req, res) {

        try {

            const lista = await ListaCompras.find()
                .populate('id_user')
                .populate('id_loja')
                .populate('id_prod');

            return res.status(200).json({
                message: 'Listagem de todas as listas realizada',
                lista
            });

        } catch (err) {

            return res.status(400).json({
                message: 'Erro ao buscar lista'
            });
        }
    },

    async show(req, res) {

        try {

            const item =
                await ListaCompras.findById(req.params.id)
                    .populate('id_user id_loja id_prod');

            if (!item) {

                return res.status(404).json({
                    message: 'Lista não encontrada'
                });
            }

            return res.status(200).json({
                message: 'Lista encontrada',
                item
            });

        } catch (err) {

            return res.status(400).json({
                message: 'Lista não encontrada'
            });
        }
    },

    async update(req, res) {

        try {

            const item =
                await ListaCompras.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );

            if (!item) {

                return res.status(404).json({
                    message: 'Lista não encontrada'
                });
            }

            return res.status(200).json({
                message: 'Dados da lista atualizados'
            });

        } catch (err) {

            return res.status(400).json({
                message: 'Lista não atualizada'
            });
        }
    },

    async patch(req, res) {

        try {

            const item =
                await ListaCompras.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );

            if (!item) {

                return res.status(404).json({
                    message: 'Lista não encontrada'
                });
            }

            return res.status(200).json({
                message: 'Dados da lista atualizados'
            });

        } catch (err) {

            return res.status(400).json({
                message: 'Lista não atualizada'
            });
        }
    },

    async destroy(req, res) {

        try {

            const item =
                await ListaCompras.findByIdAndDelete(
                    req.params.id
                );

            if (!item) {

                return res.status(404).json({
                    message: 'Lista não encontrada'
                });
            }

            return res.status(200).json({
                message: 'Lista excluída'
            });

        } catch (err) {

            return res.status(400).json({
                message: 'Lista não deletada'
            });
        }
    }
};