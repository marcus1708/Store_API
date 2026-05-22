const { Router } = require('express');
const routes = Router();

const UsuarioController = require('../controllers/UsuarioController');
const LojaController = require('../controllers/LojaController');
const ProdutoController = require('../controllers/ProdutoController');
const ListaController = require('../controllers/ListaController');
const AuthController = require('../controllers/AuthController');
const auth = require('../middlewares/auth');

routes.post('/usuarios', UsuarioController.store);
routes.get('/usuarios/', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.show);
routes.put('/usuarios/:id', UsuarioController.update);
routes.patch('/usuarios/:id', UsuarioController.patch);
routes.delete('/usuarios/:id', UsuarioController.destroy);

/*-------------------  LOGIN  -------------------*/
routes.post('/login',AuthController.login);

/*-------------------  LOJA  -------------------*/

routes.get('/lojas', LojaController.index);
routes.get('/lojas/:id', LojaController.show);
routes.delete('/lojas/:id', LojaController.destroy);
routes.post('/lojas',auth,LojaController.store);
routes.put('/lojas/:id',auth,LojaController.update);
routes.patch('/lojas/:id',auth,LojaController.patch);

/*-------------------  PRODUTO  -------------------*/

routes.post('/produtos',auth, ProdutoController.store);
routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.show);
routes.put('/produtos/:id',auth, ProdutoController.update);
routes.patch('/produtos/:id',auth, ProdutoController.patch);
routes.delete('/produtos/:id', ProdutoController.destroy);

/*-------------------  LISTAS  -------------------*/

routes.post('/listas',auth, ListaController.store);
routes.get('/listas', ListaController.index);
routes.get('/listas/:id', ListaController.show);
routes.put('/listas/:id',auth, ListaController.update);
routes.patch('/listas/:id',auth, ListaController.patch);
routes.delete('/listas/:id', ListaController.destroy);

module.exports = routes;