import { Request, Response } from 'express'
import { ListarProdutosCategoriaServices } from '../../services/Categorias/ListarProdutosCategoriaServices'


class ListarProdutosCategoriaController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const listarProdutosCategoriaServices = new ListarProdutosCategoriaServices()
        const resposta = await listarProdutosCategoriaServices.execute({
            id
        })
        return res.json(resposta)
    }
}

export { ListarProdutosCategoriaController }