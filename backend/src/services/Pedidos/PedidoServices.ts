import prismaClient from '../../prisma'

interface IdCliente {
    id_cliente: string
}

interface ListarProduto {
    id: string

}
interface ListarPedido {
    id: string
}


interface CriarItensPedido {
    id_pedido: string
    id_produto: string
    quantidade: number
    valor: number
}

class PedidosServices {
    async criarPedido({ id_cliente }: IdCliente) {
        const resposta = await prismaClient.pedido.create({
            data: {
                id_cliente
            },
            include: {
                cadastro: true
            }
        })
        return resposta
    }

    async listarProdutosCategoria({ id }: ListarProduto) {
        const resposta = await prismaClient.produto.findMany({
            where: {
                categoriaId: id
            },
            include: {
                categorias: true
            }
        })
        return resposta
    }
    async listarPedido({ id }: ListarPedido) {
        const resposta = await prismaClient.pedido.findMany({
            where: {
                id_cliente: id
            },
            include: {
                cadastro: true,
                itens: true
            }
        })
        return resposta
    }

    async criarItensPedido({ id_pedido, id_produto, quantidade, valor }: CriarItensPedido) {
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
            throw new Error('Item Já Adicionado')
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
        return resposta
    }

    async apagarItemPedido({ id }: ListarProduto) {
        await prismaClient.itemPedido.delete({
            where: {
                id: id
            }
        })
        return { dados: 'Item Deletado' }
    }

    async somarItensPedidos({ id }: ListarProduto) {
        const resposta = await prismaClient.itemPedido.aggregate({
            _sum: {
                valor: true
            },
            where: {
                id_pedido: id
            }
        })
        return resposta._sum.valor
    }
}

export { PedidosServices }