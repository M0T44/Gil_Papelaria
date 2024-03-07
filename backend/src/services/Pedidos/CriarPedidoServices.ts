import prismaClient from '../../prisma'

interface CriarPedidos {
    id: string
    n_pedido: string
    status: string
    cadastroId: string
}

class CriarPedidosServices {
    async execute({ id, n_pedido, status, cadastroId }: CriarPedidos) {
        if (!id || !n_pedido || !status || !cadastroId) {
            throw new Error('Existem campos em branco')
        }
        await prismaClient.pedido.create({
            data: {
                id: id,
                n_pedido: n_pedido,
                status: status,
                cadastroId: cadastroId
            }
        })
        return { dados: 'Cadastro Efetuado' }
    }

}

export { CriarPedidosServices }