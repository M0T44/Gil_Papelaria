import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Text
} from 'react-native'

export default function Home() {
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View>
                    <Text>
                        Home
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}