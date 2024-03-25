import prismaClient from '../../prisma'

interface ListarItem {
    id: string
}

class ListarItemUnicoServices {
    async execute({ id }: ListarItem) {
        const resposta = await prismaClient.itemPedido.findMany({
            where: {
                id_pedido:id
            },
            include: {
                produtos: true,
                pedidos: true
            }
        })
        return resposta
    }
}

export { ListarItemUnicoServices }