// import prismaClient from '../../prisma'

// interface AlterarItens {
//     id: string
//     alteraQuantidade: string
// }

// class AlterarItensServices {
//     async execute({ id, alteraQuantidade}: AlterarItens) {
//         await prismaClient.itens.update({
//             where:{
//                 id:id
//             },
//             data:{
//                 quantidade:alteraQuantidade
//             }
//         })
//         return {dados: 'Dados Alterados com Sucesso'}
//     }
// }

// export { AlterarItensServices}