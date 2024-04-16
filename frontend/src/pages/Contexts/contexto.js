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
            await AsyncStorage.setItem('token', JSON.stringify(resposta.data.token))

            setToken(true)
        } catch (error) {
            alert(error)
        }
    }


    async function handleRealizarPedido(id_cliente) {
        if (token) {
            const resposta = await apiLocal.post('/CriarPedidos', {
                id_cliente
            })

            await AsyncStorage.setItem('id_pedido', JSON.stringify(resposta.data.id))
        }
    }

    async function handleCriarItens(id_pedido,
        id_produto,
        quantidade) {
        try {
            const prodExt = categoriasProdutos.filter((item) => item.id)

            const iPd = await AsyncStorage.getItem('id_pedido')
            const iPedido = JSON.parse(iPd)
            const id_pedido = (iPedido)

            const id_produto = prodExt
            const quantidade = Number(quantidade)

            const resposta = await apiLocal.post('/CriarItensPedido', {
                id_pedido,
                id_produto,
                quantidade
            })


            console.log(resposta.data)

        } catch (err) {
            console.log(err)
        }
    }

    async function handleClearAsync() {
        await AsyncStorage.clear()
        setToken(false)
    }

    return (
        <Context.Provider value={{ autenticado, handleLogar, handleClearAsync, handleRealizarPedido, handleCriarItens }}>
            {children}
        </Context.Provider>
    )
}