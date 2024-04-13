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
    TouchableOpacity,
    Image
} from 'react-native'

export default function Carrinho() {

    const [lerItens, setLerItens] = useState([''])

    useEffect(() => {
        async function lerCriarItens() {
            try {
                const iPd = await AsyncStorage.getItem('id_pedido')
                const iPedido = JSON.parse(iPd)
                const id_pedido = (iPedido)

                const resposta = await apiLocal.get(`/ListarItens/${id_pedido}`)

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
                            //     <View key={busca.id} value={busca.id} style={style.itensCarrinho}>
                            //         <View value={busca.produtos?.id}>
                            //             <Text> {busca.produtos?.nome}</Text>
                            //             <Text>{busca.produtos?.preco}</Text>
                            //         </View>
                            //     </View>
                            <View>
                                <View>
                                    <Text> Nº Pedido: {busca.pedidos?.n_pedido}</Text>
                                </View>
                                <View key={busca.id} value={busca.id} style={style.card}>
                                    <Image
                                        style={style.imagem}
                                        source={{ uri: `http://192.168.1.8:3334/files/${busca.produtos?.banner}` }}
                                    />
                                    <View style={style.card_info} value={busca.produtos?.id}>
                                        <Text> {busca.produtos?.nome}</Text>
                                        <Text>{busca.produtos?.preco}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}

                    <View>
                        <Text>Total do pedido:</Text>
                    </View>

                    <View style={style.containerBotoes}>
                        <View>
                            <TouchableOpacity style={style.card_button}>
                                <Text style={style.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={style.card_button}>
                                <Text style={style.buttonText}>Finalizar Compra</Text>
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
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
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
    },

    imagem: {
        width: '100%',
        height: '50%',
    },

    container_card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 18,
        paddingVertical: 8,
    },
    card: {
        borderWidth: 2,           // Largura da borda
        borderColor: '#BDB9B9',     // Cor da borda
        borderRadius: 10,          // borda arredondada
        padding: 15,              // espacamento 
        margin: 6,
        width: 250,
        height: 325,
        // marginVertical: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    imagem: {
        width: '100%',
        height: '50%',
    },
    card_info: {
        marginTop: 16,
        width: 200,
        height: 50,
        alignItems: 'center'
    },
    card_button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: '#FF8616',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10
    },
    // Fim Card
})