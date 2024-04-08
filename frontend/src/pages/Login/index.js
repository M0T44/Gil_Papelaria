import { useEffect, useState } from 'react'
import apiLocal from '../../API/apiLocal/apiLocal';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native';

export default function Login() {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        try {

            const resposta = await apiLocal.post('/LoginClientes', {
                email, password
            })

            await AsyncStorage.setItem('@nome', JSON.stringify(resposta.data.nome))
            await AsyncStorage.setItem('@token', JSON.stringify(resposta.data.token))
            await AsyncStorage.setItem('@id', JSON.stringify(resposta.data.id))

           
        } catch (error) {
            alert(error)

        }

    }

    return (
        <SafeAreaView style={style.container}>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />

                <View>
                    <Text style={style.textTitulo}>
                        Login
                    </Text>

                    <View style={style.form}>
                        <TextInput
                            style={style.input}
                            placeholder='Digite seu Email'
                            value={email}
                            onChangeText={setEmail}
                        />

                        <TextInput
                            style={style.input}
                            placeholder='Digite sua Senha'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity onPress={handleLogin} style={style.buttonEnviar}>
                            <Text style={style.buttonEnviarText}>Enviar</Text>
                        </TouchableOpacity>

                        <Text style={style.text}>Já tem cadastro ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={style.buttonCriar}>
                            <Text style={style.buttonEnviarText}>Cadastrar-se</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    textTitulo: {
        fontSize: 36,
        textAlign: 'center',
        marginBottom: 12,
        marginTop: 12
    },

    text: {
        fontSize: 22,
        marginBottom: 12
    },

    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        width: 350,
        height: 40,
        borderWidth: 2,
        borderRadius: 8,
        marginVertical: 6,
        paddingLeft: 10
    },
    buttonEnviar: {
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: '#FF8016',
        height: 45,
        width: 350,
        borderRadius: 8,
    },
    buttonEnviarText: {
        textAlign: 'center',
        padding: 5,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    buttonCriar: {
        backgroundColor: '#00A4AD',
        height: 45,
        width: 350,
        borderRadius: 8,
    },
})