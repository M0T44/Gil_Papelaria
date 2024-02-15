import {Router} from 'express'

import { CriarClientesController } from './controllers/Clientes/CriarClientesController'


const router = Router()

//Clientes
router.post('/CriarClientes', new CriarClientesController().handle)


export {router}