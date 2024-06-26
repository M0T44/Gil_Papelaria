import { Request, Response } from 'express'
import { CriarClientesServices } from '../../services/Clientes/CriarClientesServices'


class CriarClientesController {
    async handle(req: Request, res: Response) {
        const { nome, telefone, cpf_cnpj, cep, bairro, nCasa, cidade, rua, estado, email, password } = req.body
        // Sconsole.log( nome,telefone,cpf_cnpj,cep,bairro,nCasa,cidade,rua,estado,email,password )

        const criarClientesServices = new CriarClientesServices()
        const cliente = await criarClientesServices.execute({
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
            password
        })
        return res.json(cliente)
    }
}

export { CriarClientesController }