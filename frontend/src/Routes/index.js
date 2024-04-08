import { useContext, useState } from 'react'
import { Context } from '../pages/Contexts/contexto'

import AuthRoutes from './auth.routes'
import NoAuthRoutes from './noAuth.routes'

export default function Rotas() {
    const  autenticado = useState(true)

    return (
        autenticado === true ? <AuthRoutes /> : <NoAuthRoutes />
    )
}