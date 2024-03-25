import { Request, Response } from 'express'
import { ListarItemUnicoServices } from '../../services/Itens/ListarItemUnicoServices'

class ListarItemUnicoController {
    async handle(req: Request, res: Response) {
    const id = req.body
    const listarItemUnicoServices = new ListarItemUnicoServices()
    const resposta = await listarItemUnicoServices.execute({
        id
    })
    return res.json(resposta)
    }
}

export { ListarItemUnicoController }