import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import MultiOpcoes from './src/components/MultiOpcoes';
import Rotas from './src/Routes'
import AuthContext from './src/pages/Contexts/contexto'


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