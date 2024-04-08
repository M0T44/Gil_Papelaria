import React, { createContext, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text
} from 'react-native'

export const Context = createContext()

export default function AuthContext() {

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