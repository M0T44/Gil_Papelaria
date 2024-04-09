import prismaClient from '../../prisma'

interface ListarCategoria {
    id: string
}

class ListarProdutosCategoriaServices {
    async execute({ id }: ListarCategoria) {
        const resposta = await prismaClient.produto.findMany({
            where:{
                categoriaId:id
            }
        })
        return resposta
    }
}

export { ListarProdutosCategoriaServices }