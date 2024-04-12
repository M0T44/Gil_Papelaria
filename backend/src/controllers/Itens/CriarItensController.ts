import { Request, Response } from 'express'
import { CriarItensServices } from '../../services/Itens/CriarItensServices'

class CriarItensController {
    async handle(req: Request, res: Response) {
       const { quantidade, id_pedido, id_produto } = req.body

       const criarItensServices = new CriarItensServices()
       const resposta = await criarItensServices.execute({
        quantidade,
        id_pedido,
        id_produto
       })
       return res.json(resposta)
    }
}

export { CriarItensController }