import React, { useEffect, useState } from 'react'
import apiLocal from '../../API/apiLocal/apiLocal'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
                const iId = await AsyncStorage.getItem('id')
                const id_cliente = JSON.parse(iId)
                const id = (id_cliente)


                const resposta = await apiLocal.get(`/ListarPedidos/${id}`)

                setLerItens(resposta.data)
            } catch (error) {
                console.log(error)
            }
        }
        lerCriarItens()
    }, [lerItens])
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View>
                    <Text>Carrinho </Text>
                </View>

                {lerItens.map((busca) => {
                    return (
                        <View key={busca.id} value={busca.id}>

                            <Text>{busca.id}</Text>
                            <Text >{busca.cadastro?.quantidade}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}