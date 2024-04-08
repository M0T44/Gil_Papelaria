import prismaClient from '../../prisma'

interface CriarClientes {
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
    password: string
}

class CriarClientesServices {
    async execute({ nome, telefone, cpf_cnpj, cep, bairro, nCasa, cidade, rua, estado, email, password }: CriarClientes) {
        if (!nome || !telefone || !email || !password) {
            throw new Error('Campos em Brancos Nao deve ser Permitidos')
        }

        const cpfCadastrado = await prismaClient.cadastro.findFirst({
            where: {
                OR: [
                    { cpf_cnpj: cpf_cnpj },
                    { email: email }
                ],
            },
        })
        if (cpfCadastrado) {
            throw new Error('CPF/CNPJ e ou Email Ja Cadastrados')
        }

        const clientes = await prismaClient.cadastro.create({
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
                senha: password
            }
            ,
            select: {
                id: true,
                nome: true,
                telefone: true,
                cpf_cnpj: true,
                cep: true,
                bairro: true,
                nCasa: true,
                cidade: true,
                rua: true,
                estado: true,
                email: true,
                senha: true

            }
        })
        return { clientes: 'Cadastro Efetuado com Sucesso' }
    }
}
export { CriarClientesServices }