const { Router } = require('express');
const routes = Router();

const UsuarioController = require('../controllers/UsuarioController');
const LojaController = require('../controllers/LojaController');
const ProdutoController = require('../controllers/ProdutoController');
const ListaController = require('../controllers/ListaController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *         endereco:
 *           type: string
 */
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       404:
 *         description: Usuário já existe
 */
routes.post('/usuarios', UsuarioController.store);
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *         endereco:
 *           type: string
 */
/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     operationId: getUserById
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID do usuario criado no MongoDB
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário listado com sucesso
 */
routes.get('/usuarios', UsuarioController.index);
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *         endereco:
 *           type: string
 */
/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza o usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
routes.put('/usuarios/:id', UsuarioController.update);
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *         endereco:
 *           type: string
 */
/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta o usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
routes.delete('/usuarios/:id', UsuarioController.destroy);
/*-------------------  LOJA  -------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Loja:
 *       type: object
 *       required:
 *         - nome
 *         - cnpj
 *       properties:
 *         nome:
 *           type: string
 *         cnpj:
 *           type: string
 *         endereço:
 *           type: string
 */
/**
 * @swagger
 * /lojas:
 *   post:
 *     summary: Cadastra uma nova loja
 *     tags: [Lojas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loja'
 *     responses:
 *       201:
 *         description: Loja criada com sucesso
 *       200:
 *         description: Lista de lojas retornadas
 */
routes.post('/lojas', LojaController.store);
/**
 * @swagger
 * components:
 *   schemas:
 *     Loja:
 *       type: object
 *       required:
 *         - nome
 *         - cnpj
 *       properties:
 *         nome:
 *           type: string
 *         cnpj:
 *           type: string
 *         endereço:
 *           type: string
 */
/**
 * @swagger
 * /lojas:
 *   get:
 *     summary: Lista uma loja
 *     tags: [Lojas]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loja'
 *     responses:
 *       200:
 *         description: Lista de lojas retornada
 */
routes.get('/lojas', LojaController.index);
/**
 * @swagger
 * components:
 *   schemas:
 *     Loja:
 *       type: object
 *       required:
 *         - nome
 *         - cnpj
 *       properties:
 *         nome:
 *           type: string
 *         cnpj:
 *           type: string
 *         endereço:
 *           type: string
 */
/**
 * @swagger
 * /lojas:
 *   put:
 *     summary: Atualiza uma loja
 *     tags: [Lojas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loja'
 *     responses:
 *       200:
 *         description: Loja atualizada com sucesso
 */
routes.put('/lojas/:id', LojaController.update);
/**
 * @swagger
 * components:
 *   schemas:
 *     Loja:
 *       type: object
 *       required:
 *         - nome
 *         - cnpj
 *       properties:
 *         nome:
 *           type: string
 *         cnpj:
 *           type: string
 *         endereço:
 *           type: string
 */
/**
 * @swagger
 * /lojas:
 *   delete:
 *     summary: Exclui uma loja
 *     tags: [Lojas]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loja'
 *     responses:
 *       200:
 *         description: Loja excluida com sucesso
 */
routes.delete('/lojas/:id', LojaController.destroy);
/*-------------------  PRODUTO  -------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - loja
 *       properties:
 *         nome:
 *           type: string
 *         preco:
 *           type: number
 *         loja:
 *           type: string
 *           description: ID da loja vinculada
 */
/**
 * @swagger
 * /Produto:
 *   post:
 *     summary: Cadastra um novo Produto
 *     tags: [Produto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       200:
 *         description: Lista de Produtos retornados
 */
routes.post('/produtos', ProdutoController.store);
/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - loja
 *       properties:
 *         nome:
 *           type: string
 *         preco:
 *           type: number
 *         loja:
 *           type: string
 *           description: ID da loja vinculada
 */
/**
 * @swagger
 * /Produto:
 *   get:
 *     summary: Lista um Produto
 *     tags: [Produto]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Lista de Produtos retornados
 */
routes.get('/produtos', ProdutoController.index);
/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - loja
 *       properties:
 *         nome:
 *           type: string
 *         preco:
 *           type: number
 *         loja:
 *           type: string
 *           description: ID da loja vinculada
 */
/**
 * @swagger
 * /Produto:
 *   put:
 *     summary: Atualiza um Produto
 *     tags: [Produto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 */
routes.put('/produtos/:id', ProdutoController.update);
/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - loja
 *       properties:
 *         nome:
 *           type: string
 *         preco:
 *           type: number
 *         loja:
 *           type: string
 *           description: ID da loja vinculada
 */
/**
 * @swagger
 * /Produto:
 *   delete:
 *     summary: Exclui um Produto
 *     tags: [Produto]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 */
routes.delete('/produtos/:id', ProdutoController.destroy);

/*-------------------  LISTAS  -------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - loja
 *       properties:
 *         usuario:
 *           type: string
 *         produtos:
 *           type: array
 *         items:
 *           type: string
 *           description: ID da loja vinculada
 */
/**
 * @swagger
 * /Listas:
 *   post:
 *     summary: Cria uma lista de compras
 *     tags: [Listas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lista'
 *     responses:
 *       201:
 *         description: Lista criada com sucesso
 *       200:
 *         description: Lista de itens retornados
 */
routes.post('/listas', ListaController.store);

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - loja
 *       properties:
 *         usuario:
 *           type: string
 *         produtos:
 *           type: array
 *         items:
 *           type: string
 *           description: ID da loja vinculada
 */
/**
 * @swagger
 * /Listas/{usuarioId}:
 *   get:
 *     summary: Busca as listas de um usuário específico
 *     tags: [Listas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lista'
 *     responses:
 *       200:
 *         description: Listas do usuário encontrada    
 */
routes.get('/listas/:usuarioId', ListaController.show);
/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - loja
 *       properties:
 *         usuario:
 *           type: string
 *         produtos:
 *           type: array
 *         items:
 *           type: string
 *           description: ID da loja vinculada
 */
/**
 * @swagger
 * /Listas/{usuarioId}:
 *   delete:
 *     summary: Deleta as listas de um usuário específico
 *     tags: [Listas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lista'
 *     responses:
 *       200:
 *         description: Listas do usuário excluida    
 */
routes.delete('/listas/:id', ListaController.destroy);

module.exports = routes;