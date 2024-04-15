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
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

    //nao ta pegando apagar pedido
    async function handleApagarPedido() {
        try {

            const iPd = await AsyncStorage.getItem('id_pedido')
            const iPedido = JSON.parse(iPd)
            const id = (iPedido)

            const resposta = await apiLocal.delete(`/ApagarPedido/${id}`)
            console.log(resposta.data)

            console.log(id)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleApagarItem() {
        try {

            const iItem = await AsyncStorage.getItem('id_item')
            const item = JSON.parse(iItem)
            const id = (item)

            const resposta = await apiLocal.delete(`/ApagarItem/${id}`)
            console.log(resposta.data)
            console.log(id)
        } catch (error) {
            console.log(error)
        }
    }

    // return (
    //     <SafeAreaView>
    //         <ScrollView>
    //             <StatusBar backgroundColor="white" barStyle="dark-content" />
    //             <View style={style.container}>

    //                 <Text>Carrinho </Text>

    // <View>
    //     {lerItens.map((busca) => {
    //         return (
    //             <View key={busca.id} value={busca.id}>
    //                 {/* <View>
    //                 <Text> Nº Pedido: {busca.pedidos?.n_pedido}</Text>
    //             </View> */}

    //                 <Image
    //                     style={style.imagem}
    //                     source={{ uri: `http://192.168.0.72:3334/files/${busca.produtos?.banner}` }}
    //                 />

    //                 <View>
    //                     <Text>{busca.produtos?.nome}</Text>
    //                     <Text>{busca.produtos?.descricao}</Text>
    //                 </View>

    //                 <Text>{busca.produtos?.preco}</Text>

    //                 <TouchableOpacity onPress={handleApagarItem}>
    //                     <Text>Deletar item</Text>
    //                 </TouchableOpacity>

    //             </View>
    //         )
    //     })}
    // </View>

    //                 <Text>Total do pedido: </Text>

    //                 <View>
    //                     <TouchableOpacity onPress={handleApagarPedido}>
    //                         <Text>Cancelar</Text>
    //                     </TouchableOpacity>
    //                     <View>
    //                         <TouchableOpacity>
    //                             <Text>Finalizar Compra</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>

    //             </View>
    //         </ScrollView>
    //     </SafeAreaView>
    // )

    return (
        <SafeAreaView style={style.container}>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View>

                    <View style={style.containerText}>
                        <Text style={style.textTitulo}>
                            Carrinho
                        </Text>
                    </View>

                    {/* <View style={style.containerProduto}>
                        <View style={style.cardProduto}>

                            <Text>Imagem</Text>

                            <Text>Produto</Text>

                            <Text>Preço</Text>

                            <Text>Remover</Text>

                        </View>
                    </View> */}

                    <View style={style.containerProduto}>
                        {lerItens.map((busca) => {
                            return (
                                <View key={busca.id} value={busca.id} style={style.cardProduto}>
                                    {/* <View>
                                    <Text> Nº Pedido: {busca.pedidos?.n_pedido}</Text>
                                </View> */}

                                    <Image
                                        style={style.imagem}
                                        source={{ uri: `http://192.168.0.72:3334/files/${busca.produtos?.banner}` }}
                                    />

                                    <View>
                                        <Text>{busca.produtos?.nome}</Text>
                                        <Text style={style.textDescricao}>{busca.produtos?.descricao}</Text>
                                    </View>

                                    <View style={style.informacaoProduto}>

                                        <Text>Valor: {busca.produtos?.preco}</Text>

                                        <TouchableOpacity onPress={handleApagarItem} style={style.buttonDeletar}>
                                            {/* <Text style={style.textBotoes}>Deletar item</Text> */}
                                            <MaterialCommunityIcons name="delete" size={24} color="white" />
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            )
                        })}
                    </View>

                    <View style={style.containerComprando}>
                        <TouchableOpacity style={style.botaoComprando} onPress={handleApagarPedido}>
                            <Text style={style.textComprando}>
                                Continuar Comprando
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={style.containerValor}>
                        <Text>
                            Valor total do pedido:
                        </Text>
                        <Text>
                            **Valor**
                        </Text>
                    </View>

                    <View style={style.containerBotoes}>
                        <TouchableOpacity style={style.botaoCancelar} onPress={handleApagarPedido}>
                            <Text style={style.textBotoes}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.botaoComprar}>
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
        height: 600,
    },

    cardProduto: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 8,
    },

    imagem: {
        width: 75,
        height: 75,
        borderRadius: 8
    },

    textDescricao: {
        fontSize: 10,
        color: '#aaa'
    },

    informacaoProduto: {
        alignItems: 'center'
    },

    containerComprando: {
        alignItems: 'center',
        paddingVertical: 24
    },

    botaoComprando: {
        backgroundColor: '#bbb',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        width: 350,
    },

    textComprando: {
        fontSize: 20,
        color: '#fff'
    },

    buttonDeletar: {
        flexDirection: 'row',
        backgroundColor: '#FF8616',
        padding: 12,
        borderRadius: 12,
        marginTop: 12
    },

    containerValor: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 24
    },

    containerBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 24,
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