import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
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
    Image,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Context } from '../Contexts/contexto'

export default function Carrinho() {

    const [lerItens, setLerItens] = useState([])
    const [valorTotal, setValorTotal] = useState(0)
    const navigation = useNavigation()
    const [token, setToken] = useState(false)

    const { handleClearToken } = useContext(Context)

    useEffect(() => {
        async function lerCriarItens() {
            try {
                const iPd = await AsyncStorage.getItem('id_pedido')
                const iPedido = JSON.parse(iPd)
                const id_pedido = iPedido

                const resposta = await apiLocal.get(`/ListarItens/${id_pedido}`)

                setLerItens(resposta.data)
                const total = resposta.data.reduce((acc, item) => acc + parseFloat(item.produtos.preco), 0)
                setValorTotal(total)
            } catch (error) {
                console.log(error)
            }
        }
        lerCriarItens()
    }, [lerItens])

    async function handleDeleteItem(itemId) {
        try {
            await apiLocal.delete(`/ApagarItemPedido/${itemId}`)
            setLerItens((prevItems) => prevItems.filter((item) => item.id !== itemId))
            const total = lerItens.reduce((acc, item) => acc + parseFloat(item.produtos.preco), 0)
            setValorTotal(total)
        } catch (error) {
            console.log(error)
        }
    }


    async function handleFinalizarPedido() {
        try {
            const iPd = await AsyncStorage.getItem('id_pedido')
            const iPedido = JSON.parse(iPd)
            const id_pedido = iPedido
            const draft = false
            const aceito = true

            await apiLocal.put('/FinalizarPedidos', {
                id: id_pedido,
                draft,
                aceito,
            })

            navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }
    }

    async function handleCancelarPedido() {
        try {
            const iPd = await AsyncStorage.getItem('id_pedido')
            const iPedido = JSON.parse(iPd)
            const id = iPedido

            await apiLocal.delete(`/ApagarPedido/${id}`)
            setLerItens([])
            setValorTotal(0)
            setToken(false)

        } catch (error) {
            console.log(error)
        }
    }


    // async function handleToken() {
    //     try {
    //         const tokenStored = await AsyncStorage.getItem('token') 

    //         if (!tokenStored) { 
    //             await AsyncStorage.clear()
    //             setToken(false)
    //         }
    //         navigation.navigate('Login')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // // async function handleToken() {
    // //     try {
    // //         await handleClearToken() 
    // //         setToken(false) 
    // //         navigation.navigate('Login') 
    // //     } catch (error) {
    // //         console.log(error)
    // //     }
    // // }

    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={styles.container}>
                    <View style={styles.containerText}>
                        <Text style={styles.textTitulo}>Carrinho</Text>
                    </View>

                    <View style={styles.containerProduto}>
                        {lerItens.map((item) => (
                            <View key={item.id} style={styles.cardProduto}>
                                <Image
                                    style={styles.imagem}
                                    source={{ uri: `http://10.152.46.17:3334/files/${item.produtos?.banner}` }}
                                />

                                <View style={styles.informacaoProdutoNome}>
                                    <View>
                                        <Text>{item.produtos?.nome}</Text>
                                        <Text style={styles.textDescricao}>{item.produtos?.descricao}</Text>
                                    </View>
                                </View>

                                <View style={styles.informacaoProduto}>
                                    <Text style={{ fontWeight: "bold" }}>{item.produtos?.preco}</Text>
                                    <TouchableOpacity style={styles.lixeira} onPress={() => handleDeleteItem(item.id)}>
                                        <MaterialCommunityIcons name="delete" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.containerComprando}>
                        <TouchableOpacity style={styles.botaoComprando} onPress={() => navigation.navigate('Home')}>
                            <Text>Continuar Comprando</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerValor}>
                        <Text>Valor Total:</Text>
                        <Text style={{ fontWeight: "bold" }}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)}</Text>
                    </View>

                    <View style={styles.containerBotoes}>

                        <TouchableOpacity style={styles.botaoCancelar} onPress={handleCancelarPedido}>
                            <Text style={styles.textBotoes}>Cancelar Pedido</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.botaoFinalizar} onPress={handleFinalizarPedido}>
                            <Text style={styles.textBotoes}>Finalizar Pedido</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerText: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    textTitulo: {
        fontSize: 26,
    },
    containerProduto: {
        height: 500,
    },
    cardProduto: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 16,
        paddingHorizontal: 24
    },
    imagem: {
        width: 75,
        height: 75,
        borderRadius: 8,
    },
    textDescricao: {
        fontSize: 10,
        color: '#aaa',
    },
    informacaoProdutoNome: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12
    },
    informacaoProduto: {
        alignItems: 'center',
    },
    lixeira: {
        marginTop: 16
    },
    containerValor: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    containerBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
    },
    containerComprando: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
    },
    botaoComprando: {
        padding: 12,
        color: '#fff',
        backgroundColor: '#bbb',
        width: 335,
        alignItems: 'center',
        borderRadius: 12,
    },
    botaoCancelar: {
        padding: 12,
        color: '#fff',
        backgroundColor: '#FF8616',
        width: 150,
        alignItems: 'center',
        borderRadius: 12,
    },
    botaoFinalizar: {
        padding: 12,
        color: '#fff',
        backgroundColor: '#00A4AD',
        width: 150,
        alignItems: 'center',
        borderRadius: 12,
    },
    textBotoes: {
        color: '#fff'
    }
})