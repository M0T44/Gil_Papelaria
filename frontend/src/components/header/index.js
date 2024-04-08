import * as React from 'react'
import { SpeedDial } from '@rneui/themed';
import {
    StyleSheet,
    ScrollView,
    StatusBar,
    View,
    SafeAreaView,
    Image,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';

import Carrinho from '../../pages/Carrinho';

const Drawer = createDrawerNavigator()

export default function Header() {
    const navigation = useNavigation();
    return (
        <ScrollView stickyHeaderIndices={[1]}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <SafeAreaView>
                <View style={styleHeader.container}>
                    <View style={styleHeader.logo}>
                        <Image
                            style={styleHeader.logoImagem}
                            source={require('../../../imgs/logo.png')}
                            onPress={() => navigation.navigate('Body')}
                        />
                    </View>

                    <SpeedDial.Action
                        style={styleHeader.carinho}
                        icon={() => (
                            <MaterialCommunityIcons
                                name="cart"
                                size={20}
                                color="#fff"
                            />
                        )}
                        onPress={() => navigation.navigate('Carrinho')}
                        buttonStyle={{ backgroundColor: '#FF8616' }}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styleHeader = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        backgroundColor: '#fff',
        paddingTop: 15
    },

    logo: {
        justifyContent: "center",
        alignItems: "center",
        flexWrap: 'wrap',
        width: 140,
        height: 40,
        margin: 20,
    },

    logoImagem: {
        width: 140,
        height: 140,
    },

    carinho: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 40,
        height: 40,
    }
});