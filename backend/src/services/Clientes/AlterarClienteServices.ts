import prismaClient from "../../prisma";


interface AlterarCliente {
    id: string
    nome: string
    telefone: string
    cpf_cnpj: string
    cep: string
    bairro: string
    nCasa: string
    cidade: string
    rua: string
    estado: string
    email: string
    senha: string
}

class AlterarClienteServices {
    async execute({ id,
        nome,
        telefone,
        cpf_cnpj,
        cep,
        bairro,
        nCasa,
        cidade,
        rua,
        estado,
        email,
        senha,
    }: AlterarCliente) {
        await prismaClient.cadastro.update({
            where: {
                id: id
            },
            data: {
                nome: nome,
                telefone: telefone,
                cpf_cnpj: cpf_cnpj,
                cep: cep,
                bairro: bairro,
                nCasa: nCasa,
                cidade: cidade,
                rua: rua,
                estado: estado,
                email: email,
                senha: senha
            }
        })
        return{ dados : 'Dados Alterados com Sucesso'}
    }

}
export {AlterarClienteServices}