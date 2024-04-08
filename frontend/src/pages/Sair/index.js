import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text
} from 'react-native'

export default function Sair() {
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View>
                    <Text>
                     Sair
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}