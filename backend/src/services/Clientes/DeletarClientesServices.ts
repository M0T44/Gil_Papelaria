import prismaClient from "../../prisma";

interface DeletarCliente{
    apagar: string
}

class DeletarClientesServices{
    async execute ({apagar} : DeletarCliente) {
        await prismaClient.cadastro.delete({
            where:{
                id:apagar
            }
        })

        return{dados:'Apagado Com Sucesso'}
    }
}

export { DeletarClientesServices}