import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text
} from 'react-native'

export default function Carrinho() {
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View>
                    <Text>
                        Carrinho
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}