import { useContext } from 'react'
import { Context } from '../pages/Contexts/contexto'
import { ScrollView, Text, View } from 'react-native'

import AuthRoutes from './auth.routes'
import NoAuthRoutes from './noAuth.routes'

export default function Rotas() {
    const autenticado = false
    return (
        autenticado === true ? <AuthRoutes /> : <NoAuthRoutes />
    )
}