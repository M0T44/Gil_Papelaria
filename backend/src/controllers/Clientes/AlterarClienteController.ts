import { Request, Response } from "express";
import { AlterarClienteServices } from '../../services/Clientes/AlterarClienteServices'
class AlterarClienteController {
    async handle(req: Request, res: Response) {
        const { id,
            nome, telefone, cpf_cnpj, cep, bairro, nCasa, cidade, rua, estado, email, senha } = req.body

        const alteraClientesServices = new AlterarClienteServices()
        const resposta = await alteraClientesServices.execute({
            id, nome, telefone, cpf_cnpj, cep, bairro, nCasa, cidade, rua, estado, email, senha

        })
        return res.json(resposta)

    }
}

export { AlterarClienteController }