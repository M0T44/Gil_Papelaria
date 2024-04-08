import React, { createContext, useState } from 'react'
import apiLocal from '../../API/apiLocal/apiLocal'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Context = createContext()

export default function AuthContext({ children }) {

    const [token, setToken] = useState(false)
    const autenticado = !!token  //nega duas vezes para ser verdadeiro

    async function handleClearAsync() {
        await AsyncStorage.clear()
        setToken(false)
    }

    async function handleLogin(email, password) {
        try {

            const resposta = await apiLocal.post('/LoginClientes', {
                email, password
            })

            await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
            await AsyncStorage.setItem('@token', JSON.stringify(resposta.data.token))
            await AsyncStorage.setItem('@id', JSON.stringify(resposta.data.id))

            setToken(true)

        } catch (error) {
            alert(error)

        }

    }



    return (
        <Context.Provider value={{ autenticado, handleClearAsync, handleLogin }}>
            {children}
        </Context.Provider>
    )
}