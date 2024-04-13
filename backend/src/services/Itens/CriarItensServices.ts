import prismaClient from '../../prisma'

interface CriarItens {
    id_pedido: string
    id_produto: string
    quantidade: number
    valor: number
}
class CriarItensServices {
    async execute({ id_pedido, id_produto, quantidade, valor }: CriarItens) {
        const itemExiste = await prismaClient.itemPedido.findFirst({
            where: {
                AND: [
                    {
                        id_produto: id_produto
                    },
                    {
                        id_pedido: id_pedido
                    }
                ]
            }
        })
        if (itemExiste) {
            throw new Error('Item Jà Adicionado')
        }

        const resposta = await prismaClient.itemPedido.create({
            data: {
                id_pedido: id_pedido,
                id_produto: id_produto,
                quantidade: quantidade,
                valor: valor
            },
            include: {
                produtos: true
            }
        })

        console.log(resposta)

    }
}
export { CriarItensServices }