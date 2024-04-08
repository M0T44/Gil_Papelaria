import { Request, Response } from 'express'
import { ListarCategoriaUnicaServices } from '../../services/Categorias/ListarCategoriaUnicaServices'


class ListarCategoriaUnicaController {
    async handle(req: Request, res: Response) {
       const { id } = req.params
       const 
       listarCategoriaUnicaServices = new ListarCategoriaUnicaServices()
       const resposta = await listarCategoriaUnicaServices.execute({
        id
       })
       return res.json(resposta)
    }
}

export { ListarCategoriaUnicaController}