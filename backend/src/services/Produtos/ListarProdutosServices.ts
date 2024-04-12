import prismaClient from "../../prisma";

class ListarProdutosServices {
    async execute() {
        const resposta = await prismaClient.produto.findMany({
            orderBy: {
                nome: "asc"
            }
        })
        return resposta
    }
}

export { ListarProdutosServices }