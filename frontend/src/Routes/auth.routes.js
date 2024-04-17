import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Carrinho from '../pages/Carrinho'
import Home from '../pages/Home'
import Produtos from '../pages/Produtos'

const Stack = createNativeStackNavigator()

export default function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen                               //stack.screen = tela inicial 
                name='Home'
                component={Home}
                options={{ headerShown: false }}        //hearderShown: false= tira o header fixo de cima
            />

            <Stack.Screen
                name='Carrinho'
                component={Carrinho}
                options={{ headerShown: false }}
            />


            <Stack.Screen
                name='Produtos'
                component={Produtos}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>


    )
}