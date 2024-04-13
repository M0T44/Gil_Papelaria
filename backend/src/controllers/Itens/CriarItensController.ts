import { Request, Response } from 'express'
import { CriarItensServices } from '../../services/Itens/CriarItensServices'

class CriarItensController {
    async handle(req: Request, res: Response) {
        const { id_pedido, id_produto, valor, quantidade } = req.body
        const criarItens = new CriarItensServices()
        const response = await criarItens.execute({
            id_pedido, id_produto, quantidade, valor
        })
        return res.json(response)
    }
}

export { CriarItensController }