import React, { useEffect, useState } from 'react'
import apiLocal from '../../API/apiLocal/apiLocal'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

export default function Carrinho() {

    const [lerItens, setLerItens] = useState([''])

    useEffect(() => {
        async function lerCriarItens() {
            try {
                const iPd = await AsyncStorage.getItem('id_pedido')
                const iPedido = JSON.parse(iPd)
                const id_pedido = (iPedido)

                const resposta = await apiLocal.get(`/ListarPedidos/${id_pedido}`)

                setLerItens(resposta.data)
                console.log(resposta)
            } catch (error) {
                console.log(error)
            }
        }
        lerCriarItens()
    }, [])
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View>
                    <Text>Carrinho </Text>
                </View>

                {lerItens.map((item) => {
                    return (
                        <Text key={item.id} value={item.id} >{item.cadastro.nome}</Text>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}