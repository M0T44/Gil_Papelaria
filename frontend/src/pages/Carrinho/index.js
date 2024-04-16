import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import apiLocal from '../../API/apiLocal/apiLocal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Carrinho() {
    const [lerItens, setLerItens] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        async function lerCriarItens() {
            try {
                const iPd = await AsyncStorage.getItem('id_pedido');
                const iPedido = JSON.parse(iPd);
                const id_pedido = iPedido;

                const resposta = await apiLocal.get(`/ListarItens/${id_pedido}`);

                setLerItens(resposta.data);
                // Calcular o valor total do pedido
                const total = resposta.data.reduce((acc, item) => acc + parseFloat(item.produtos.preco), 0);
                setValorTotal(total);
            } catch (error) {
                console.log(error);
            }
        }
        lerCriarItens();
    }, [lerItens]);

    const handleDeleteItem = async (itemId) => {
        try {
            // Fazer a solicitação de exclusão do item
            await apiLocal.delete(`/ApagarItemPedido/${itemId}`);
            // Atualizar a lista de itens após a exclusão
            setLerItens((prevItems) => prevItems.filter((item) => item.id !== itemId));
            // Recalcular o valor total após a exclusão
            const total = lerItens.reduce((acc, item) => acc + parseFloat(item.produtos.preco), 0);
            setValorTotal(total);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFinalizarPedido = async () => {
        try {
            const iPd = await AsyncStorage.getItem('id_pedido');
            const iPedido = JSON.parse(iPd);
            const id_pedido = iPedido;
            const draft = false;
            const aceito = true;

            await apiLocal.put('/FinalizarPedidos', {
                id: id_pedido,
                draft,
                aceito,
            });
            // Navegar de volta para a página inicial após finalizar o pedido
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelarPedido = async () => {
        try {
            const iPd = await AsyncStorage.getItem('id_pedido');
            const iPedido = JSON.parse(iPd);
            const id_pedido = iPedido;

            // Limpar todos os itens do pedido
            await apiLocal.delete(`/LimparItensPedido/${id_pedido}`);

            // Atualizar a lista de itens após a exclusão
            setLerItens([]);
            // Recalcular o valor total após a exclusão
            setValorTotal(0);
        } catch (error) {
            console.log(error);
        }
    };

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
                                    source={{ uri: `http://192.168.1.8:3334/files/${item.produtos?.banner}` }}
                                />

                                <View style={styles.informacaoProdutoNome}>
                                    <View>
                                        <Text>{item.produtos?.nome}</Text>
                                        <Text style={styles.textDescricao}>{item.produtos?.descricao}</Text>
                                    </View>
                                </View>

                                <View style={styles.informacaoProduto}>
                                    <Text>{item.produtos?.preco}</Text>
                                    {/* Adicionar ícone da lixeira com função de exclusão */}
                                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                                        <MaterialCommunityIcons name="delete" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Exibir o valor total do pedido */}
                    <View style={styles.containerValor}>
                        <Text>Valor Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)}</Text>
                    </View>

                    {/* Botões para continuar comprando, cancelar pedido e finalizar pedido */}
                    <View style={styles.containerBotoes}>
                        <TouchableOpacity style={styles.botaoComprando} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.textBotoes}>Continuar Comprando</Text>
                        </TouchableOpacity>
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
    );
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
        height: 700,
    },
    cardProduto: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
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
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    informacaoProduto: {
        alignItems: 'center',
    },
    containerValor: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    containerBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
    },
    botaoComprando: {
        padding: 12,
        color: '#fff',
        backgroundColor: '#bbb',
        width: 150,
        alignItems: 'center',
        borderRadius: 12,
    },
    botaoCancelar: {
        backgroundColor: 'red'
    },
})