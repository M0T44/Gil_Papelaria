import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'


//Criar
import { CriarClientesController } from './controllers/Clientes/CriarClientesController'
import { CriarProdutosController } from './controllers/Produtos/CriarProdutosController'
import { CriarCategoriasController } from './controllers/Categorias/CriarCategoriasController'

//Login 
import { LoginControler } from './controllers/Login/LoginController'

//ALterar
import { AlterarClienteController } from './controllers/Clientes/AlterarClienteController'

//Deletar
import { DeletarClientesController } from './controllers/Clientes/DeletarClientesController'

const router = Router()
const upload = multer(uploadConfig.upload('./tmp'))


//Clientes
router.post('/CriarClientes', new CriarClientesController().handle)

//Login
router.post('/LoginClientes', new LoginControler().handle)

//Alterar
router.put('/AlterarClientes',new AlterarClienteController().handle)

//Deletar
router.delete('/ApagarClientes/:id', new DeletarClientesController().handle)

//Produtos
router.post('/CriarProdutos', upload.single('file'), new CriarProdutosController().handle)

//Categorias
router.post('/CriarCategorias', new CriarCategoriasController().handle)
export {router}