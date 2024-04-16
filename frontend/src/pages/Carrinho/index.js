import React, { useEffect, useState } from 'react'
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
    Image
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Botoes() {
    const navigation = useNavigation()
    const [itensPedido, setItensPedido] = useState([''])
    const [valorTotal, setValorTotal] = useState('')

    useEffect(() => {
        try {
            async function somarItensPedido() {
                const iPd = await AsyncStorage.getItem('id_pedido')
                const iPedido = JSON.parse(iPd)
                const id = (iPedido)

                const resposta = await apiLocal.get(`/SomarItensPedido/${id}`)
                setValorTotal(resposta.data)

            }
            somarItensPedido()
        } catch (err) {
            console.log(err)
        }
    }, [itensPedido])

    async function handleFinalizarPedidos() {
        try {
            const iPd = await AsyncStorage.getItem('id_pedido')
            const iPedido = JSON.parse(iPd)
            const id = (iPedido)
            const draft = false
            const aceito = true

            await apiLocal.put('/FinalizarPedidos', {
                id,
                draft,
                aceito
            })


        } catch (error) {
            console.log(error)
        }
    }

    async function handleApagarPedido() {
        try {

            const iPd = await AsyncStorage.getItem('id_pedido')
            const iPedido = JSON.parse(iPd)
            const id = (iPedido)

            const resposta = await apiLocal.delete(`/ApagarPedido/${id}`)

            console.log(resposta)

            navigation.navigate('Home')

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView style={style.container}>
            <ScrollView>
                <View>
                    <View style={style.containerComprando}>
                        <TouchableOpacity style={style.botaoComprando} onPress={() => navigation.navigate('Home')}>
                            <Text style={style.textComprando}>
                                Continuar Comprando
                            </Text>
                        </TouchableOpacity>
                    </View>


                    {valorTotal !== null && (
                        <View style={style.containerValor} >
                            <Text>Valor Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(`${valorTotal}`)} </Text>
                        </View>
                    )}

                    <View style={style.containerBotoes}>
                        <TouchableOpacity style={style.botaoCancelar} onPress={handleApagarPedido}>
                            <Text style={style.textBotoes}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.botaoComprar} onPress={handleFinalizarPedidos}>
                            <Text style={style.textBotoes}>
                                Finalizar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default function Carrinho({ route }) {

    const { idItem } = route.params
    const [lerItens, setLerItens] = useState([''])
    const [pedido, setPedido] = useState([''])


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

    // async function handleApagarItem() {
    //     try {
    //         const resposta = await apiLocal.delete(`/ApagarItemPedido/${idItem}`);
    //         // setPedido(resposta)
    //         let dados = {
    //             idItem: idItem
    //         }

    //         setPedido(oldArray => [...oldArray, dados])
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async function handleApagarItem() {
        try {
            const resposta = await apiLocal.delete(`/ApagarItemPedido/${idItem}`);
            console.log(resposta)
        } catch (error) {
            console.log(error);
        }
    }

    // async function handleApagarItem() {
    //     try {
    //          await apiLocal.delete(`/ApagarItemPedido/${idItem}`);
            
    //         let dados = {
    //             id: idItem
    //         }
            
    //         setPedido(oldArray => [...oldArray, dados])

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    
    // useEffect(() => {
    //     async function handleApagarItem() {
    //         try {
    //             const id = idItem
    //             const resposta = await apiLocal.delete(`/ApagarItemPedido/${id}`);
    //             setPedido(resposta)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     handleApagarItem()
    // }, [])

    return (
        <SafeAreaView >
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={style.container} F>
                    <View style={style.containerText}>
                        <Text style={style.textTitulo}>
                            Carrinho
                        </Text>
                    </View>

                    <View style={style.containerProduto}>
                        {lerItens.map((busca) => {
                            return (
                                <View key={busca.id} value={busca.id} style={style.cardProduto}>

                                    <View style={style.informacaoProdutoNome}>
                                        <Image
                                            style={style.imagem}
                                            source={{ uri: `http://192.168.1.8:3334/files/${busca.produtos?.banner}` }}
                                        />

                                        <View>
                                            <Text>{busca.produtos?.nome}</Text>
                                            <Text style={style.textDescricao}>{busca.produtos?.descricao}</Text>
                                        </View>
                                    </View>

                                    <View style={style.informacaoProduto}>
                                        <Text> {busca.produtos?.preco}</Text>

                                        <TouchableOpacity onPress={handleApagarItem} style={style.buttonDeletar}>
                                            <MaterialCommunityIcons name="delete" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        })}

                    </View>

                    <Botoes />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    containerText: {
        alignItems: 'center',
        paddingVertical: 24,
    },

    textTitulo: {
        fontSize: 26
    },

    containerProduto: {
        height: 700,
    },

    cardProduto: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 16
    },

    imagem: {
        width: 75,
        height: 75,
        borderRadius: 8
    },

    textDescricao: {
        fontSize: 10,
        color: '#aaa',
    },

    informacaoProdutoNome: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    informacaoProduto: {
        alignItems: 'center'
    },

    containerComprando: {
        alignItems: 'center',
        paddingVertical: 15
    },

    botaoComprando: {
        backgroundColor: '#bbb',
        alignItems: 'center',
        padding: 6,
        borderRadius: 12,
        width: 300,
    },

    textComprando: {
        fontSize: 20,
        color: '#fff'
    },

    buttonDeletar: {
        flexDirection: 'row',
        borderRadius: 12,
        marginTop: 12
    },

    containerValor: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: 'red'
    },

    containerBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
    },

    botaoCancelar: {
        padding: 12,
        color: '#fff',
        backgroundColor: '#00A4AD',
        width: 150,
        alignItems: 'center',
        borderRadius: 12
    },

    botaoComprar: {
        padding: 12,
        color: '#fff',
        backgroundColor: '#FF8616',
        width: 150,
        alignItems: 'center',
        borderRadius: 12
    },

    textBotoes: {
        color: '#fff'
    }
})