import React, { useState, useEffect, useParams } from 'react'
import apiLocal from '../../API/apiLocal/apiLocal'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    TouchableOpacity,
    TextInput,
} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../../components/header';

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
                    <Card />
                </View>
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
                // alert(resposta.id)
            }
            lerCategorias()
        } catch (error) {
            alert(error)
        }
    }, [categorias])


    function handleCategoriaProduto() {
        alert(categorias)
        // navigation.navigate('Produtos', {
        //     categoriaId: categorias.id
        // })
    }

    return (
        <ScrollView horizontal={true}>
            <View style={styleBody.container_categorias}>
                {categorias.map((item) => {
                    return (
                        <TouchableOpacity
                            style={styleBody.button_categorias} onPress={handleCategoriaProduto}>

                            <Text style={styleBody.buttonText_categorias} key={item.id} value={item.id}>{item.nome}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    )
}

function Card() {
    return (
        <ScrollView horizontal={true}>
            <View style={styleBody.container_card}>
                <View style={styleBody.card}>
                    <Image
                        source={require('../../../imgs/caderno.png')}
                    />
                    <View style={styleBody.card_info}>
                        <Text>
                            Caderno Inteligente
                        </Text>
                        <Text>
                            Breve descrição do produto
                        </Text>
                        <TouchableOpacity style={styleBody.card_button} onPress={() => console.log('Botão pressionado')}>
                            <Text style={styleBody.buttonText}>Add ao Carrinho</Text>
                            <MaterialCommunityIcons name="cart" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styleBody.card}>
                    <Image
                        source={require('../../../imgs/caneta.png')}
                    />
                    <View style={styleBody.card_info}>
                        <Text>
                            Caneta Mágica
                        </Text>
                        <Text>
                            Breve descrição do produto
                        </Text>
                        <TouchableOpacity style={styleBody.card_button} onPress={() => console.log('Botão pressionado')}>
                            <Text style={styleBody.buttonText}>Add ao Carrinho</Text>
                            <MaterialCommunityIcons name="cart" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styleBody.card}>
                    <Image
                        source={require('../../../imgs/caderno.png')}
                    />
                    <View style={styleBody.card_info}>
                        <Text>
                            Caderno Inteligente
                        </Text>
                        <Text>
                            Breve descrição do produto
                        </Text>
                        <TouchableOpacity style={styleBody.card_button} onPress={() => console.log('Botão pressionado')}>
                            <Text style={styleBody.buttonText}>Add ao Carrinho</Text>
                            <MaterialCommunityIcons name="cart" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styleBody.card}>
                    <Image
                        source={require('../../../imgs/caneta.png')}
                    />
                    <View style={styleBody.card_info}>
                        <Text>
                            Caneta Mágica
                        </Text>
                        <Text>
                            Breve descrição do produto
                        </Text>
                        <TouchableOpacity style={styleBody.card_button} onPress={() => console.log('Botão pressionado')}>
                            <Text style={styleBody.buttonText}>Add ao Carrinho</Text>
                            <MaterialCommunityIcons name="cart" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
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
        display: 'flex',
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