import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'

// import ToastManager from 'toastify-react-native'

import MultiOpcoes from './src/components/MultiOpcoes';
import Rotas from './src/Routes'
import AuthContext from './src/pages/Contexts/contexto'

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