import { Request, Response } from 'express'
import { PedidosServices } from '../../services/Pedidos/PedidoServices'

class PedidosController {
    async criarPedidos(req: Request, res: Response) {
        const { id_cliente } = req.body

        const criarPedidosServices = new PedidosServices()
        const resposta = await criarPedidosServices.criarPedido({
            id_cliente
        })
        return res.json(resposta)
    }

    async listarProdutosCategoria(req: Request, res: Response) {
        const { id } = req.params
        const listarProdutosCategoria = new PedidosServices()
        const resposta = await listarProdutosCategoria.listarProdutosCategoria({
            id
        })
        return res.json(resposta)
    }

    async listarPedido(req: Request, res: Response) {
        const { id } = req.params
        const listarPedido = new PedidosServices()
        const resposta = await listarPedido.listarPedido({
            id
        })
        return res.json(resposta)
    }

    async criarItensPedido(req: Request, res: Response) {
        const { id_pedido, id_produto, quantidade } = req.body
        const criarItensPedidoController = new PedidosServices()
        const resposta = await criarItensPedidoController.criarItensPedido({
            id_pedido,
            id_produto,
            quantidade
        })
        return res.json(resposta)
    }

    async apagarItemPedido(req: Request, res: Response) {
        const { id } = req.params
        const apagarItemPedido = new PedidosServices()
        const resposta = await apagarItemPedido.apagarItemPedido({
            id
        })
        return res.json(resposta)
    }

    async apagarPedido(req: Request, res: Response) {
        const { id} = req.params
        const apagarPedido = new PedidosServices()
        const resposta = await apagarPedido.apagarPedido({
            id
        })
        return res.json(resposta)
    }

    async finalizarPedido(req: Request, res: Response) {
        const { id, draft, aceito } = req.body
        const finalizarPedidosController = new PedidosServices()
        const resposta = await finalizarPedidosController.finalizarPedido({
            id, draft, aceito
        })
        return res.json(resposta)
    }

    async somarItensPedido(req: Request, res: Response) {
        const { id } = req.params
        const somarItensPedido = new PedidosServices()
        const resposta = await somarItensPedido.somarItensPedidos({
            id
        })
        return res.json(resposta)
    }
}

export { PedidosController }