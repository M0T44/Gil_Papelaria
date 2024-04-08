import React, { useContext } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import { Context } from '../Contexts/contexto'

export default function Sair() {
    const { handleClearAsync } = useContext(Context)

    async function sairClear() {
        await handleClearAsync()

    }
    return (
        <SafeAreaView>
            <ScrollView >
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={style.container}>
                    <TouchableOpacity onPress={sairClear} style={style.buttonEnviar}>
                        <Text style={style.buttonEnviarText}>Enviar</Text>
                    </TouchableOpacity>
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