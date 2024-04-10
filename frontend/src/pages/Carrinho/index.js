import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

export default function Carrinho() {
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View>
                    <Text>Carrinho </Text>
                    <TouchableOpacity>
                        <Text>Realizar Pedido</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}