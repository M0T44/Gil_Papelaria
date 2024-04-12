import React, { useEffect, useState } from 'react'
import apiLocal from '../../API/apiLocal/apiLocal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    StyleSheet,
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
                <View style={style.container}>
                    <View>
                        <Text>Carrinho </Text>
                    </View>

                    {lerItens.map((busca) => {
                        return (
                            <View key={busca.id} value={busca.id} style={style.itensCarrinho}>
                                <Text>{busca.id}</Text>
                                <Text >{busca.cadastro?.nome}</Text>
                            </View>
                        )
                    })}

                    <View>
                        <Text>Total do pedido:</Text>
                    </View>

                    <View style={style.containerBotoes}>
                        <View>
                            <TouchableOpacity>
                                <Text>Finalizar Compra</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        height: 950
    },

    itensCarrinho: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    containerBotoes: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})