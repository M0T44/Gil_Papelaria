import { Request, Response } from 'express'
import { CriarClientesServices } from '../../services/Clientes/CriarClientesServices'


class CriarClientesController {
    async handle(req: Request, res: Response) {
        const { nome,telefone,cpf_cnpj,cep,bairro,nCasa,cidade,rua,estado,email,senha } = req.body
        // Sconsole.log( nome,telefone,cpf_cnpj,cep,bairro,nCasa,cidade,rua,estado,email,senha )

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
            senha
        })
<<<<<<< HEAD
        //console.log(cliente)
=======
>>>>>>> fb3d8d40a578d227978d64e6f5eb870e5fa58752
        return res.json(cliente)
    }
}

export { CriarClientesController }