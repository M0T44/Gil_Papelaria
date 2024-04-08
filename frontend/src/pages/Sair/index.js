import React, { useContext } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text
} from 'react-native'

import { Context } from '../Contexts/contexto'

export default function Sair() {
    const { handleClearAsync } = useContext(Context)

    async function sairClear() {
        await handleClearAsync()

    }
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