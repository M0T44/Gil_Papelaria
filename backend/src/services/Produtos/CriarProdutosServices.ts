import prismaClient from '../../prisma'

interface CriarProdutos {
    nome: string
    descricao:string
    fabricante:string
    quantidade:string
    preco:string
    banner:string
    categoriaId: string
}

class CriarProdutosServices {
    async execute({ nome, descricao, fabricante, quantidade, preco, banner, categoriaId }: CriarProdutos) {
        if(!nome || !descricao || !fabricante || !quantidade || !preco || !banner || !categoriaId) {
            throw new Error('Existem campos em branco')
        }
    
        await prismaClient.produto.create({
            data:{
                nome:nome,
                descricao:descricao,
                fabricante:fabricante,
                quantidade:quantidade,
                preco:preco,
                banner:banner,
                categoriaId:categoriaId
            }
        })
        return{ dados: 'Produto Cadastrado'}
    }
}

export { CriarProdutosServices}