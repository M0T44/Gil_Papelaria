import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text
} from 'react-native'

export default function Configuracoes() {
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View>
                    <Text>
                        Teste
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}