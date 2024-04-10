import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import apiLocal from '../../API/apiLocal/apiLocal'

export const Context = createContext()

export default function AuthContext({ children }) {

    const [token, setToken] = useState(false)
    const autenticado = !!token  //nega duas vezes para ser verdadeiro

    async function handleLogar(email, password) {
        try {
            const resposta = await apiLocal.post('/LoginClientes', {
                email, password
            })

            await AsyncStorage.setItem('id', JSON.stringify(resposta.data.id))

            setToken(true)
        } catch (error) {
            alert(error)
        }
    }

    async function handleClearAsync() {
        await AsyncStorage.clear()
        setToken(false)
    }


    return (
        <Context.Provider value={{ autenticado, handleLogar, handleClearAsync }}>
            {children}
        </Context.Provider>
    )
}