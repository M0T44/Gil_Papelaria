// import { Router } from 'express'
// import multer from 'multer'
// import uploadConfig from './config/multer'


// //Criar
// import { CriarClientesController } from './controllers/Clientes/CriarClientesController'
// import { CriarProdutosController } from './controllers/Produtos/CriarProdutosController'
// import { CriarCategoriasController } from './controllers/Categorias/CriarCategoriasController'
// import { CriarItensController } from './controllers/Itens/CriarItensController'
// import { PedidosController } from './controllers/Pedidos/PedidoController'

// //Login 
// import { LoginControler } from './controllers/Login/LoginController'

// //ALterar
// import { AlterarClienteController } from './controllers/Clientes/AlterarClienteController'
// import { AlterarItensController } from './controllers/Itens/AlterarItensController'

// //Deletar
// import { DeletarClientesController } from './controllers/Clientes/DeletarClientesController'

// //Listar
// import { ListarCategoriasController } from './controllers/Categorias/ListarCategoriasController'
// import { ListarProdutosCategoriaController } from './controllers/Categorias/ListarProdutosCategoriaController'

// const router = Router()
// const upload = multer(uploadConfig.upload('./tmp'))

// //Criar
// router.post('/CriarClientes', new CriarClientesController().handle)
// router.post('/CriarProdutos', upload.single('file'), new CriarProdutosController().handle)
// router.post('/CriarCategorias', new CriarCategoriasController().handle)
// router.post('/CriarItensPedido', new PedidosController().criarItensPedido)
// router.post('/CriarPedidos', new PedidosController().criarPedidos)
// //Login
// router.post('/LoginClientes', new LoginControler().handle)

// //Alterar
// router.put('/AlterarClientes', new AlterarClienteController().handle)
// router.put('/AlterarPedido', new CriarItensController().handle)
// router.put('/AlterarItem', new AlterarItensController().handle)

// //Deletar
// router.delete('/ApagarClientes/:id', new DeletarClientesController().handle)

// //Listar
// router.get('/ListarCategorias', new ListarCategoriasController().handle)
// router.get('/ListarPedidos/:id', new PedidosController().listarPedido)
// router.get('/ListarProdutosCategoria/:id', new PedidosController().listarProdutosCategoria)
// export { router }


import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer';
import { CriarClientesController } from './controllers/Clientes/CriarClientesController';
import { CriarProdutosController } from './controllers/Produtos/CriarProdutosController';
import { CriarCategoriasController } from './controllers/Categorias/CriarCategoriasController';
import { PedidosController } from './controllers/Pedidos/PedidoController';
import { LoginControler } from './controllers/Login/LoginController';
import { AlterarClienteController } from './controllers/Clientes/AlterarClienteController';
import { AlterarItensController } from './controllers/Itens/AlterarItensController';
import { DeletarClientesController } from './controllers/Clientes/DeletarClientesController';
import { ListarCategoriasController } from './controllers/Categorias/ListarCategoriasController';
import { ListarProdutosCategoriaController } from './controllers/Categorias/ListarProdutosCategoriaController';
const router = Router();
const upload = multer(uploadConfig.upload('./tmp'));

router.post('/CriarClientes', new CriarClientesController().handle);
router.post('/CriarProdutos', upload.single('file'), new CriarProdutosController().handle);
router.post('/CriarCategorias', new CriarCategoriasController().handle);
router.post('/CriarItensPedido', new PedidosController().criarItensPedido);
router.post('/CriarPedidos', new PedidosController().criarPedidos);
router.post('/LoginClientes', new LoginControler().handle);
router.put('/AlterarClientes', new AlterarClienteController().handle);
// router.put('/AlterarPedido', new CriarItensController().handle);
router.put('/AlterarItem', new AlterarItensController().handle);
router.delete('/ApagarClientes/:id', new DeletarClientesController().handle);
router.get('/ListarCategorias', new ListarCategoriasController().handle);
router.get('/ListarPedidos/:id', new PedidosController().listarPedido);
router.get('/ListarProdutosCategoria/:id', new PedidosController().listarProdutosCategoria);
export { router };