import * as React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import Home from './src/pages/Home'
import Login from './src/pages/Login'
import Cadastre_se from './src/pages/Cadastro';
import Carrinho from './src/pages/Carrinho';
import Sair from './src/pages/Sair';

import MultiOpcoes from './src/components/MultiOpcoes';
import Rotas from './src/Routes'
import AuthContext from './src/pages/Contexts/contexto'
const Drawer = createDrawerNavigator()

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator screenOptions={{ header: (props) => <Header {...props} /> }}>
//         <Drawer.Screen name='Home' component={Home} />
//         <Drawer.Screen name='Cadastro' component={Cadastre_se} />
//         <Drawer.Screen name='Carrinho' component={Carrinho} />
//         <Drawer.Screen name='Login' component={Login} />
//         <Drawer.Screen name='Sair' component={Sair} />
//       </Drawer.Navigator>
//       <MultiOpcoes />
//     </NavigationContainer>
//   )
// }

export default function App() {
  return (
    <NavigationContainer>
      <AuthContext>
        <Rotas />
        <MultiOpcoes />
      </AuthContext>
    </NavigationContainer>
  )
}