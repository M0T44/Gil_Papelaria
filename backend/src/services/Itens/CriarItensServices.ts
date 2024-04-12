import prismaClient from '../../prisma'

interface CriarItens {
    quantidade: number
    id_pedido: string
    id_produto: string
}

class CriarItensServices {
    async execute({ quantidade, id_pedido, id_produto }: CriarItens) {
        if (!quantidade  || !id_pedido || id_produto) { 
            throw new Error('Existem Campos em Branco')
        }
        await prismaClient.itemPedido.create({
            data:{
                quantidade: quantidade,
                id_pedido:id_pedido,
                id_produto:id_produto
            }
        })
        return { dados: 'Cadastro Efetuado Com sucesso'}
    }
}
export { CriarItensServices }