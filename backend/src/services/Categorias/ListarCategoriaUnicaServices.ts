import prismaClient from '../../prisma'

interface ListarCategoria{
    id: string
}

class ListarCategoriaUnicaServices{
    async execute({id}: ListarCategoria){
        const resposta = await prismaClient.categoria.findUnique({
            where:{
                id:id
            },
            select:{
                id: true,
                nome: true
            }
        })
        return resposta
    }
}

export { ListarCategoriaUnicaServices }