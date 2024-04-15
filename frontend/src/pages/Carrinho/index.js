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


function Body() {
    return (
        <SafeAreaView style={style.container}>
            <ScrollView>
                <View>
                    <View style={style.containerText}>
                        <Text style={style.textTitulo}>
                            Carrinho
                        </Text>
                    </View>
                    {/* <Produtos /> */}
                    <Botoes />
                </View>

            </ScrollView >
        </SafeAreaView>
    )
}

// function Produtos({ route }) {


//     return (
//         <SafeAreaView style={style.container}>
//             <ScrollView>

//             </ScrollView>
//         </SafeAreaView>
//     )

// }

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
            const id_pedido = (iPedido)

            const resposta = await apiLocal.delete(`/ApagarPedido/${id_pedido}`)

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

    const { id } = route.params
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

    async function handleApagarItem() {
        try {
            const resposta = await apiLocal.delete(`/ApagarItem/${id}`)
            let dados = {
                id
            }
            console.log(dados)

            setPedido(oldArray => [...oldArray, dados])
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View>
                    <View style={style.containerProduto}>
                        {lerItens.map((busca) => {
                            return (
                                <View key={busca.id} value={busca.id} style={style.cardProduto}>
                                    {/* <View>
                                        <Text> Nº Pedido: {busca.pedidos?.n_pedido}</Text>
                                    </View> */}

                                    <Image
                                        style={style.imagem}
                                        source={{ uri: `http://10.152.46.17:3334/files/${busca.produtos?.banner}` }}
                                    />

                                    <View>
                                        <Text>{busca.produtos?.nome}</Text>
                                        <Text style={style.textDescricao}>{busca.produtos?.descricao}</Text>
                                    </View>

                                    <View style={style.informacaoProduto}>

                                        <Text>Valor: {busca.produtos?.preco}</Text>

                                        <TouchableOpacity onPress={handleApagarItem} style={style.buttonDeletar}>
                                            {/* <Text style={style.textBotoes}>Deletar item</Text> */}
                                            <MaterialCommunityIcons name="delete" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>

                </View>
                <Body />
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
        height: 500,
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
        paddingVertical: 15
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
        padding: 12,
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