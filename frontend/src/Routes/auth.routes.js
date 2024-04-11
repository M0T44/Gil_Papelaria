import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Carrinho from '../pages/Carrinho'
import Home from '../pages/Home'
// import Sair from '../pages/Sair'
import Produtos from '../pages/Produtos'

const Stack = createNativeStackNavigator()

export default function AuthRoutes() {
    return (
        <Stack.Navigator>
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

            {/* <Stack.Screen
                name='Sair'
                component={Sair}
                options={{ headerShown: false }}
            /> */}

            <Stack.Screen
                name='Produtos'
                component={Produtos}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>


    )
}