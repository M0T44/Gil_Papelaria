import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'


//Criar
import { CriarClientesController } from './controllers/Clientes/CriarClientesController'
import { CriarProdutosController } from './controllers/Produtos/CriarProdutosController'
import { CriarCategoriasController } from './controllers/Categorias/CriarCategoriasController'
import { CriarItensController } from './controllers/Itens/CriarItensController'
import { PedidosController } from './controllers/Pedidos/PedidoController'

//Login 
import { LoginControler } from './controllers/Login/LoginController'

//ALterar
import { AlterarClienteController } from './controllers/Clientes/AlterarClienteController'
import { AlterarItensController } from './controllers/Itens/AlterarItensController'

//Deletar
import { DeletarClientesController } from './controllers/Clientes/DeletarClientesController'

//Listar
import { ListarCategoriasController } from './controllers/Categorias/ListarCategoriasController'
import { ListarProdutosController } from './controllers/Produtos/ListarProdutosController'
import { ListarItemUnicoController } from './controllers/Itens/ListarItemUnicoController'
// import { ListarItemUnicoController } from './controllers/Itens/ListarItemUnicoController'

const router = Router()
const upload = multer(uploadConfig.upload('./tmp'))

//Criar
router.post('/CriarClientes', new CriarClientesController().handle)
router.post('/CriarProdutos', upload.single('file'), new CriarProdutosController().handle)
router.post('/CriarCategorias', new CriarCategoriasController().handle)
router.post('/CriarItens', new CriarItensController().handle)
router.post('/CriarPedidos', new PedidosController().criarPedidos)

//Login
router.post('/LoginClientes', new LoginControler().handle)

//Alterar
router.put('/AlterarClientes', new AlterarClienteController().handle)
router.put('/AlterarPedido', new CriarItensController().handle)
router.put('/AlterarItem', new AlterarItensController().handle)
router.put('/FinalizarPedidos', new PedidosController().finalizarPedido)

//Deletar
router.delete('/ApagarClientes/:id', new DeletarClientesController().handle)
router.delete('/ApagarPedido/:id', new PedidosController().apagarPedido)
router.delete('/ApagarItem/:id', new PedidosController().apagarItemPedido)

// vestidinho verde aventaç colorido
//Listar
router.get('/ListarCategorias', new ListarCategoriasController().handle)
router.get('/ListarPedidos/:id', new PedidosController().listarPedido)
router.get('/ListarItens/:id', new ListarItemUnicoController().handle)
router.get('/ListarProdutosCategoria/:id', new PedidosController().listarProdutosCategoria)
router.get('/ListarProdutos', new ListarProdutosController().handle)
router.get('/SomarItensPedido/:id', new PedidosController().somarItensPedido)

export { router }