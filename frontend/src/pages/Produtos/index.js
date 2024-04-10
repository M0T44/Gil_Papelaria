import React, { useState, useEffect } from 'react'
import apiLocal from '../../API/apiLocal/apiLocal'

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

export default function Produtos({ route }) {

    const [categoriasProdutos, setCategoriasProdutos] = useState([''])
    const { categoriaId } = route.params


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



    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View >
                    <Text>Caderno</Text>
                </View>


            </ScrollView >
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
})