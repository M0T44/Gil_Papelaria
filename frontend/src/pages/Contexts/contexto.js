import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import apiLocal from '../../API/apiLocal/apiLocal'

export const Context = createContext()

export default function AuthContext({ children }) {

    const [token, setToken] = useState(false)
    const navigation = useNavigation()
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

    async function handleRealizarPedido(id_pedido, id_produto, quantidade, valor) {
        try {

            const response = await apiLocal.post('/CriarItensPedido', {
                id_pedido, id_produto, quantidade, valor
            })

            console.log(response)
            // const resposta = await apiLocal.post('/CriarPedidos', {
            //     id_cliente
            // })

            // await AsyncStorage.setItem('id_pedido', JSON.stringify(resposta.data.id))

            navigation.navigate('Carrinho')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Context.Provider value={{ autenticado, handleLogar, handleClearAsync, handleRealizarPedido }}>
            {children}
        </Context.Provider>
    )
}