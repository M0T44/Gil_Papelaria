import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import MultiOpcoes from '../components/MultiOpcoes';

import Carrinho from '../pages/Carrinho'
import Home from '../pages/Home'

const Stack = createNativeStackNavigator()

export default function NoAuthRoutes() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='Cadastro'
                component={Cadastro}
                options={{ headerShown: false }}
            />

            <Stack.Screen                           //stack.screen = tela inicial 
                name='MultiOpcoes'
                component={MultiOpcoes}
                options={{ headerShown: false }}   //hearderShown: false= tira o header fixo de cima
            />

            <Stack.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen                           //stack.screen = tela inicial 
                name='Carrinho'
                component={Carrinho}
                options={{ headerShown: false }}   //hearderShown: false= tira o header fixo de cima
            />
        </Stack.Navigator>
    )
}