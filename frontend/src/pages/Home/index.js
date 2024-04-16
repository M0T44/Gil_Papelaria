import React, { useState, useEffect, useParams, useContext } from 'react'
import apiLocal from '../../API/apiLocal/apiLocal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native'
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../../components/header';
import { Context } from '../Contexts/contexto';

function Body() {
    const data = [
        { id: '1', imagemCss: styleBody.imagemBanner, imageUrl: require('../../../imgs/banner1.png') },
        { id: '2', imagemCss: styleBody.imagemBanner2, imageUrl: require('../../../imgs/banner2.png') },
        { id: '3', imagemCss: styleBody.imagemProdutos, imageUrl: require('../../../imgs/caneta.png') }
    ]

    return (
        <ScrollView>
            <SafeAreaView>
                <Header />
                <View style={styleBody.container}>
                    <Carousel data={data} />
                    <Text style={styleBody.text_categorias}>Categorias</Text>
                    <Categorias />
                    <Text style={styleBody.text_maisVendidos}>Produtos mais vendidos</Text>
                    <Card />
                    <Text style={styleBody.text_maisVendidos}>Produtos em destaque</Text>
                    <CardDestaque />
                </View>
                {/* <MultiOpcoes /> */}
            </SafeAreaView>
        </ScrollView>
    )
}

function Carousel({ data }) {
    return (
        <Swiper showsButtons={true} loop={true} style={styleBody.swiper}>
            {data.map((item) => (
                <View style={styleBody.container_carousel} key={item.id}>
                    <Image source={item.imageUrl} style={item.imagemCss} />
                </View>
            ))}
        </Swiper>
    )
}

function Categorias() {

    const navigation = useNavigation()
    const [categorias, setCategorias] = useState([''])

    useEffect(() => {
        try {
            async function lerCategorias() {
                const resposta = await apiLocal.get('/ListarCategorias')
                setCategorias(resposta.data)
                // console.log(resposta)
            }
            lerCategorias()
        } catch (error) {
            alert(error)
        }
    }, [categorias])


    function handleCategoriaProduto(id) {
        // alert(id)
        navigation.navigate('Produtos', {
            categoriaId: id
        })
    }

    return (
        <ScrollView horizontal={true}>
            <View style={styleBody.container_categorias}>
                {categorias.map((item) => {
                    return (
                        <TouchableOpacity
                            style={styleBody.button_categorias} onPress={() => handleCategoriaProduto(item.id)}>
                            <Text style={styleBody.buttonText_categorias} key={item.id} value={item.id}>{item.nome}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    )
}

function Card() {
    const navigation = useNavigation()

    const [itensPedido, setItensPedido] = useState([''])
    const [categoriasProdutos, setCategoriasProdutos] = useState([''])
    const { handleRealizarPedido, handleClearAsync } = useContext(Context)

    useEffect(() => {
        try {
            async function lerCategoriasProdutos() {
                const resposta = await apiLocal.get(`/ListarProdutosCategoria/7cd82866-cbd5-4e64-98ef-d5237ff5dc36`)
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

                const iToken = await AsyncStorage.getItem('token')
                const token = JSON.parse(iToken)

                if (!token) {
                    await handleClearAsync();
                    navegacao.navigate('Login');
                }

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
        <ScrollView horizontal={true}>
            <View style={styleBody.container_card}>
                {categoriasProdutos.map((item) => {
                    return (
                        <View key={item.id} value={item.id} style={styleBody.card}>
                            <Image
                                style={styleBody.imagem}
                                source={{ uri: `http://10.152.46.17:3334/files/${item.banner}` }}
                            />
                            <View style={styleBody.card_info} value={item.id}>
                                <Text> {item.nome}</Text>
                                <Text>{item.descricao}</Text>
                                <Text>{item.preco}</Text>
                                <TouchableOpacity style={styleBody.card_button} onPress={() => handleCriarItens(item.id)} >
                                    <Text style={styleBody.buttonText}>Add ao Carrinho</Text>
                                    <MaterialCommunityIcons name="cart" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

function CardDestaque() {
    const navigation = useNavigation()

    const [categoriasProdutosDestaque, setCategoriasProdutosDestaque] = useState([''])
    const { handleRealizarPedido } = useContext(Context)

    useEffect(() => {
        try {
            async function lerCategoriasProdutosDestaque() {
                const resposta = await apiLocal.get(`/ListarProdutosCategoria/0ca2f74e-17bb-4de9-94de-20874f7585ee`)
                setCategoriasProdutosDestaque(resposta.data)
            }
            lerCategoriasProdutosDestaque()
        } catch (error) {
            alert(error)
        }
    }, [categoriasProdutosDestaque])

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
            const id_pedido = (iPedido)

            const prodExt = categoriasProdutosDestaque.filter((item) => item.id === id)
            const id_produto = id
            const valor = Number(prodExt.map((item) => item.preco))
            const quantidade = Number(prodExt.map((item) => item.quantidade))


            const resposta = await apiLocal.post('/CriarItens', {
                id_pedido,
                id_produto,
                quantidade,
                valor
            })

            console.log(resposta)

            let dados = {
                id: resposta
            }
            // setItensPedido(oldArray => [...oldArray, dados])

            // await AsyncStorage.setItem('id_item', JSON.stringify(resposta.data.id))

            // navigation.navigate('Carrinho')
            navigation.navigate('Carrinho', {
                id: resposta.id
            })



        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ScrollView horizontal={true}>
            <View style={styleBody.container_card}>
                {categoriasProdutosDestaque.map((item) => {
                    return (
                        <View key={item.id} style={styleBody.card}>
                            <Image
                                style={styleBody.imagem}
                                source={{ uri: `http://10.152.46.17:3334/files/${item.banner}` }}
                            />
                            <View style={styleBody.card_info} value={item.id}>
                                <Text> {item.nome}</Text>
                                <Text>{item.descricao}</Text>
                                <Text>{item.preco}</Text>
                                <TouchableOpacity style={styleBody.card_button} onPress={() => handleCriarItens(item.id)} >
                                    <Text style={styleBody.buttonText}>Add ao Carrinho</Text>
                                    <MaterialCommunityIcons name="cart" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default function Home() {

    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <Body />
            </ScrollView>
        </SafeAreaView>
    )
}

const styleBody = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    // Começo Carroussel
    swiper: {
        height: 250,
    },
    container_carousel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagemBanner: {
        width: 400,
        height: 250,
    },
    imagemBanner2: {
        width: 400,
        height: 250,
    },
    imagemProdutos: {
        width: 380,
        height: 200
    },
    // Fim Carroussel

    // Começo Categoria
    container_categorias: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 26,
        paddingVertical: 12,
    },
    button_categorias: {
        textAlign: 'center',
        marginTop: 16,
        backgroundColor: '#00A4AD',
        borderRadius: 22,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    buttonText_categorias: {
        fontSize: 16,
        color: '#fff'
    },
    text_categorias: {
        fontSize: 28,
        marginTop: 12,
    },
    // Fim Categoria

    // Começo Card
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
        marginHorizontal: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    imagem: {
        width: '100%',
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
    // Fim Card

    // Começo Texto
    text_maisVendidos: {
        fontSize: 28,
        marginTop: 16,
    },
    // Fim Texto
})