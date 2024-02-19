import { Request, Response } from "express";
import { LoginServices } from '../../services/login/LoginServices'

class LoginControler {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        
        const loginServices = new LoginServices()
        const resposta = await loginServices.execute({
            email, password
        })

        
        return res.json(resposta)
    }
}
export { LoginControler }