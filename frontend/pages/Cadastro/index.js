import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    View,
    Text,
    TextInput,

} from 'react-native'

export default function Cadastre_se() {
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={style.container}>
                    <Text>
                        Cadastre-se
                    </Text>
                    <View style={style.form}>
                        <TextInput
                            style={style.input}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        height: 150,
    },

    input: {
        width: 300,
        height: 40
    }
})