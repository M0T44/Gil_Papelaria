import * as React from 'react'
import { SpeedDial } from '@rneui/themed';
import Swiper from 'react-native-swiper';
import {
    StyleSheet,
    ScrollView,
    StatusBar,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';

import Home from '../../pages/Home';
import Login from '../../pages/Login'
// import Configuracoes from './pages/Configuracoes';
import Cadastre_se from '../../pages/Cadastro';
import Carrinho from '../../pages/Carrinho';
import Sair from '../../pages/Sair';

import { FloatingAction } from "react-native-floating-action";

export default function MultiOpcoes() {
    const navegacao = useNavigation();
    const actions = [
        {
            text: "Home",
            icon: <MaterialCommunityIcons name="home" size={20} color="#FFF" />,
            name: "bt_accessibility",
            position: 1,
            color: '#FF8016',
            path: 'Home'
        },
        {
            text: "Login",
            icon: <MaterialCommunityIcons name="login" size={20} color="#FFF" />,
            name: "bt_language",
            position: 3,
            color: '#FF8016',
            path: 'Login'
        },
        {
            text: "Sair",
            icon: <MaterialCommunityIcons name="logout" size={20} color="#FFF" />,
            name: "bt_room",
            position: 4,
            color: '#FF8016',
            path: 'Sair'
        },
        {
            text: "Cadastro",
            icon: <MaterialCommunityIcons name="account-plus" size={20} color="#FFF" />,
            name: "bt_videocam",
            position: 2,
            color: '#FF8016',
            path: 'Cadastro'
        }
    ];

    return (
        <View style={styleMultiOpcoes.container}>
            <FloatingAction
                color='#FF8016'
                distanceToEdge={vertical = 15}
                position='right'
                actions={actions}
                onPressItem={(name, index) => {
                    const action = actions.find(action => action.name === name);
                    navegacao.navigate(action.path);
                }}
            />
        </View>
    )
}

const styleMultiOpcoes = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    }
});