import React, { useState, useEffect } from 'react'
import apiLocal from '../../API/apiLocal/apiLocal'

import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
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
        <ScrollView>
            <View >
                {categoriasProdutos.map((item) => {
                    return (
                        <Text value={item.id}>{item.nome}</Text>
                    )
                })}
            </View>
        </ScrollView>
    )
}