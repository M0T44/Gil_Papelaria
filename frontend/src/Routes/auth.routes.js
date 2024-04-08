import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Carrinho from '../pages/Carrinho'

const Stack = createNativeStackNavigator()

export default function NoAuthRoutes() {
    return (
        <Stack.Screen                           //stack.screen = tela inicial 
            name='Carrinho'
            component={Carrinho}
            options={{ headerShown: false }}   //hearderShown: false= tira o header fixo de cima
        />

    )
}