import { Router } from 'express'
// import multer from 'multer'
import uploadConfig from './config/multer'


//Criar
import { CriarClientesController } from './controllers/Clientes/CriarClientesController'
import { CriarProdutosController } from './controllers/Produtos/CriarProdutosController'
import { CriarCategoriasController } from './controllers/Categorias/CriarCategoriasController'
import { CriarItensController } from './controllers/Itens/CriarItensController'

//Login 
import { LoginControler } from './controllers/Login/LoginController'

//ALterar
import { AlterarClienteController } from './controllers/Clientes/AlterarClienteController'
import { AlterarItensController } from './controllers/Itens/AlterarItensController'

//Deletar
import { DeletarClientesController } from './controllers/Clientes/DeletarClientesController'

//Listar
import { ListarCategoriasController } from './controllers/Categorias/ListarCategoriasController'
import { ListarCategoriaUnicaController } from './controllers/Categorias/ListarCategoriaUnicaController'

const router = Router()
// const upload = multer(uploadConfig.upload('./tmp'))

//Criar
router.post('/CriarClientes', new CriarClientesController().handle)
// router.post('/CriarProdutos', upload.single('file'), new CriarProdutosController().handle)
router.post('/CriarCategorias', new CriarCategoriasController().handle)
router.post('/CriarItens', new CriarItensController().handle)

//Login
router.post('/LoginClientes', new LoginControler().handle)

//Alterar
router.put('/AlterarClientes', new AlterarClienteController().handle)
router.put('/AlterarPedido', new CriarItensController().handle)
router.put('/AlterarItem', new AlterarItensController().handle)

//Deletar
router.delete('/ApagarClientes/:id', new DeletarClientesController().handle)

//Listar
router.get('/ListarCategorias', new ListarCategoriasController().handle)
router.get('/ListarUmaCategoria/:id', new ListarCategoriaUnicaController().handle)
export { router }