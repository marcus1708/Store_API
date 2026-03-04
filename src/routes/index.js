const { Router } = require('express');
const routes = Router();

const UsuarioController = require('../controllers/UsuarioController');
const LojaController = require('../controllers/LojaController');
const ProdutoController = require('../controllers/ProdutoController');
const ListaController = require('../controllers/ListaController');

routes.post('/usuarios', UsuarioController.store);
routes.get('/usuarios/', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.show);
routes.put('/usuarios/:id', UsuarioController.update);
routes.patch('/usuarios/:id', UsuarioController.patch);
routes.delete('/usuarios/:id', UsuarioController.destroy);

/*-------------------  LOJA  -------------------*/
routes.post('/lojas', LojaController.store);
routes.get('/lojas', LojaController.index);
routes.get('/lojas/:id', LojaController.show);
routes.put('/lojas/:id', LojaController.update);
routes.patch('/lojas/:id', LojaController.patch);
routes.delete('/lojas/:id', LojaController.destroy);

/*-------------------  PRODUTO  -------------------*/

routes.post('/produtos', ProdutoController.store);
routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.show);
routes.put('/produtos/:id', ProdutoController.update);
routes.patch('/produtos/:id', ProdutoController.patch);
routes.delete('/produtos/:id', ProdutoController.destroy);

/*-------------------  LISTAS  -------------------*/

routes.post('/listas', ListaController.store);
routes.get('/listas', ListaController.index);
routes.get('/listas/:id', ListaController.show);
routes.put('/listas/:id', ListaController.update);
routes.patch('/listas/:id', ListaController.patch);
routes.delete('/listas/:id', ListaController.destroy);

module.exports = routes;