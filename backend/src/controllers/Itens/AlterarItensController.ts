import { Request, Response } from 'express'
import { AlterarItensServices } from '../../services/Itens/AlterarItensServices'

class AlterarItensController {
    async handle(req: Request, res: Response) {
        const { id, alteraQuantidade } = req.body
        const alterarItensServices = new AlterarItensServices() 
        const resposta = await alterarItensServices.execute({
            id,
            alteraQuantidade
        })
        return res.json(resposta)
    }
}

export { AlterarItensController}