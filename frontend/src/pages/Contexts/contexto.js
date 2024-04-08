import React, { createContext, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text
} from 'react-native'

export const Context = createContext()

export default function AuthContext({ children }) {

    const [token, setToken] = useState(false)
    const autenticado = !!token  //nega duas vezes para ser verdadeiro


    return (
        <Context.Provider value={{ autenticado }}>
            {children}
        </Context.Provider>
    )
}