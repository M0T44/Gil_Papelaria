import * as React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import Home from './pages/Home';
import Login from './pages/Login'
import Cadastre_se from './pages/Cadastro';
import Carrinho from './pages/Carrinho';
import Sair from './pages/Sair';

import Header from './components/header';
import MultiOpcoes from './components/MultiOpcoes';

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ header: (props) => <Header {...props} /> }}>
        <Drawer.Screen name='Home' component={Home} />
        <Drawer.Screen name='Cadastro' component={Cadastre_se} />
        <Drawer.Screen name='Carrinho' component={Carrinho} />
        <Drawer.Screen name='Login' component={Login} />
        <Drawer.Screen name='Sair' component={Sair} />
      </Drawer.Navigator>
      <MultiOpcoes />
    </NavigationContainer>
  )
}