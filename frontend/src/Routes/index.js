import { useContext, useState } from 'react'
import { Context } from '../pages/Contexts/contexto'

import AuthRoutes from './auth.routes'
import NoAuthRoutes from './noAuth.routes'

export default function Rotas() {
    const { autenticado } = useContext(Context)

    return (
        autenticado === true ? <AuthRoutes /> : <NoAuthRoutes />
    )
}