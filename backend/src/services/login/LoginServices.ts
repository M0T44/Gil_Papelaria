
import prismaClient from "../../prisma";
import { sign } from 'jsonwebtoken'
import { compare } from "bcryptjs";

interface Login {
    email: string
    password: string
}

class LoginServices {
    async execute({ email, password }: Login) {

        const user = await prismaClient.cadastro.findFirst({
            where: {
                email: email
            }
        })
       
        if (!user) {

            throw new Error('Usuario/Senha Incorretos')
        }

        const token = sign({
            id: user.id,
            email: user.email
        },
            process.env.JWT_SEGREDO,
            {
                subject: user.id,
                expiresIn: '1h'
            })
        return {
            id: user.id,
            email: user.email,
            token: token
        }
    }
}

export { LoginServices }