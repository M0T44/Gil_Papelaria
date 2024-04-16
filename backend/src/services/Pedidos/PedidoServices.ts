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

interface ListarItem {
    id: string
}
interface CriarItensPedido {
    id_pedido: string
    id_produto: string
    quantidade: number
}

interface FinalizarPedidos {
    id: string
    draft: boolean
    aceito: boolean
}

interface ApagarPedido {
    id: string
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

    async criarItensPedido({ id_pedido, id_produto, quantidade }: CriarItensPedido) {
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
                quantidade: quantidade
            },
            include: {
                produtos: true
            }
        })
        return resposta
    }

    async apagarItemPedido({ id }: ListarItem) {
        try {
            await prismaClient.itemPedido.deleteMany({
                where: {
                    id: id
                }
            });
            return { dados: 'Item deletado' };
        } catch (error) {
            console.error('Erro ao deletar item de pedido:', error);
            throw new Error('Erro ao deletar item de pedido');
        }
    }
    // async apagarItemPedido({ id }: ListarItem) {
    //     await prismaClient.itemPedido.deleteMany({
    //         where: {
    //             id: id
    //         }
    //     })
    //     return { dados: 'Item Deletado' }
    // }

    async apagarPedido({ id }: ApagarPedido) {
        await prismaClient.pedido.deleteMany({
            where: {
                id: id
            }
        })
        return { dados: 'Pedido Deletado' }
    }

    async finalizarPedido({ id, draft, aceito }: FinalizarPedidos) {
        await prismaClient.pedido.update({
            where: {
                id: id
            },
            data: {
                draft: draft,
                aceito: aceito
            }
        })
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