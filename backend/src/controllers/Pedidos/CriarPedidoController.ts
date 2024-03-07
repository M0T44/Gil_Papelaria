import { Request, Response } from 'express'
import { CriarPedidosServices } from '../../services/Pedidos/CriarPedidoServices'

class CriarPedidosController {
    async handle (req: Request, res: Response) {
        const { id, n_pedido, status, cadastroId } = req.body

        const criarPedidosServices = new CriarPedidosServices()
        const resposta = await criarPedidosServices.execute ({
            id,
            n_pedido,
            status,
            cadastroId
        })
        return res.json(resposta)
    }
}

export { CriarPedidosController }