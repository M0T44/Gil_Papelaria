import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import apiLocal from '../../API/apiLocal/apiLocal'
import { Context } from '../Contexts/contexto'
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Produtos({ route }) {

    const navigation = useNavigation()

    const [categoriasProdutos, setCategoriasProdutos] = useState([''])
    const { categoriaId } = route.params
    const [itensPedido, setItensPedido] = useState([''])
    const { handleRealizarPedido } = useContext(Context)

    useEffect(() => {
        try {
            async function lerCategoriasProdutos() {
                const resposta = await apiLocal.get(`/ListarProdutosCategoria/${categoriaId}`)
                setCategoriasProdutos(resposta.data)
            }
            lerCategoriasProdutos()
        } catch (error) {
            alert(error)
        }
    }, [categoriasProdutos])



    useEffect(() => {
        async function realizarPedido() {
            try {
                const iId = await AsyncStorage.getItem('id')
                const id = JSON.parse(iId)
                const id_cliente = (id)

                await handleRealizarPedido(id_cliente)
            } catch (error) {
                console.log("error")
            }
        }
        realizarPedido()
    }, [])

    async function handleCriarItens(id) {
        try {
            const iPd = await AsyncStorage.getItem('id_pedido')
            const iPedido = JSON.parse(iPd)
            const id_pedido = iPedido

            const prodExt = categoriasProdutos.filter((item) => item.id === id)
            const id_produto = id
            const valor = Number(prodExt.map((item) => item.preco))
            const quantidade = Number(prodExt.map((item) => item.quantidade))

            const resposta = await apiLocal.post('/CriarItens', {
                id_pedido,
                id_produto,
                quantidade,
                valor
            })

            let dados = {
                id: resposta.data.id
            }

            setItensPedido(oldArray => [...oldArray, dados])

            navigation.navigate('Carrinho', {
                idItem: resposta.data.id
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView>
            <ScrollView >
                <View style={styleProdutos.container}>


                    <View style={styleProdutos.container_card}>
                        {categoriasProdutos.map((item) => {
                            return (
                                <View key={item.id} value={item.id} style={styleProdutos.card}>
                                    <Image
                                        style={styleProdutos.imagem}
                                        source={{ uri: `http://10.152.46.17:3334/files/${item.banner}` }}
                                    />
                                    <View style={styleProdutos.card_info} value={item.id}>
                                        <Text style={{ fontWeight: "bold", fontSize: 18, }}> {item.nome}</Text>
                                        <Text style={styleProdutos.descricao}>{item.descricao}</Text>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, }}>R${item.preco}</Text>
                                        <TouchableOpacity style={styleProdutos.card_button} onPress={() => handleCriarItens(item.id)} >
                                            <Text style={styleProdutos.buttonText}>Add ao Carrinho</Text>
                                            <MaterialCommunityIcons name="cart" size={24} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styleProdutos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    text_categoria: {
        marginTop: 24,
        fontSize: 28,
    },

    // Começo Card
    container_card: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        borderWidth: 2,           // Largura da borda
        borderColor: '#BDB9B9',     // Cor da borda
        borderRadius: 10,          // borda arredondada
        padding: 15,              // espacamento 
        margin: 6,
        width: 250,
        height: 390,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 16
    },
    imagem: {
        width: '60%',
        height: '50%',
    },
    card_info: {
        marginTop: 16,
        width: 220,
        height: 70,
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
    descricao:{
        textAlign:'center'
    }
    // Fim Card
})