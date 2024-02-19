import {Router} from 'express'

//Criar
import { CriarClientesController } from './controllers/Clientes/CriarClientesController'

//Login 
import { LoginControler } from './controllers/Login/LoginController'

//ALterar
import { AlterarClienteController } from './controllers/Clientes/AlterarClienteController'

const router = Router()

//Clientes
router.post('/CriarClientes', new CriarClientesController().handle)

//Login
router.post('/LoginClientes', new LoginControler().handle)

//Alterar
router.put('/AlterarClientes',new AlterarClienteController().handle)

export {router}