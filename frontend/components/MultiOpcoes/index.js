import * as React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { FloatingAction } from "react-native-floating-action";

export default function MultiOpcoes() {
    const navegacao = useNavigation();
    const actions = [
        {
            text: "Home",
            icon: <MaterialCommunityIcons name="home" size={20} color="#FFF" />,
            name: "bt_accessibility",
            position: 1,
            color: '#00A4AD',
            path: 'Home'
        },
        {
            text: "Login",
            icon: <MaterialCommunityIcons name="login" size={20} color="#FFF" />,
            name: "bt_language",
            position: 3,
            color: '#00A4AD',
            path: 'Login'
        },
        {
            text: "Sair",
            icon: <MaterialCommunityIcons name="logout" size={20} color="#FFF" />,
            name: "bt_room",
            position: 4,
            color: '#00A4AD',
            path: 'Sair'
        },
        {
            text: "Cadastro",
            icon: <MaterialCommunityIcons name="account-plus" size={20} color="#FFF" />,
            name: "bt_videocam",
            position: 2,
            color: '#00A4AD',
            path: 'Cadastro'
        }
    ];

    return (
        <View style={styleMultiOpcoes.container}>
            <FloatingAction
                color='#00A4AD'
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