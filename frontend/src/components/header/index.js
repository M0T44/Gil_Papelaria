import React, { useState } from 'react'
import { SpeedDial } from '@rneui/themed';
import {
    StyleSheet,
    ScrollView,
    StatusBar,
    View,
    SafeAreaView,
    Image,
    Modal,
    Pressable,
    Text,
    TextInput
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';

// function ModalPesquisa() {
//     const [modalVisible, setModalVisible] = useState(false);

//     return (
//         <View style={stylesModal.containerModal}>
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                     Alert.alert('Modal has been closed.');
//                     setModalVisible(!modalVisible);
//                 }}>
//                 <View style={stylesModal.centeredView}>
//                     {/* <View style={stylesModal.modalView}>
//                         <Pesquisa />
//                         <Pressable
//                             style={[stylesModal.button, stylesModal.buttonClose]}
//                             onPress={() => setModalVisible(!modalVisible)}>
//                             <Text style={stylesModal.textStyle}>Fechar Pesquisa</Text>
//                         </Pressable>
//                     </View> */}
//                 </View>
//             </Modal>
//             <Pressable
//                 onPress={() => setModalVisible(true)}>
//                 <MaterialCommunityIcons
//                     style={styleBody.icon_pesquisa}
//                     name="magnify" size={24}
//                     color="white" />
//             </Pressable>
//         </View>
//     )
// }

// function Pesquisa() {
//     return (
//         <View style={styleBody.container_pesquisa}>
//             <TextInput
//                 placeholder='Pesquisar'
//                 style={styleBody.input_pesquisa}
//             />
//             <MaterialCommunityIcons
//                 style={styleBody.icon_pesquisa}
//                 name="magnify" size={24}
//                 color="white" />
//         </View>
//     )
// }

function Carrinho() {
    const navigation = useNavigation();
    return (
        <View style={styleBody.container_pesquisa}>
            <MaterialCommunityIcons
                style={styleBody.icon_pesquisa}
                name="cart"
                size={20}
                color="#fff"
                onPress={() => navigation.navigate('Carrinho')}
            />
        </View>
    )
}

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

                    <View style={styleHeader.funcionalidades}>
                        {/* <ModalPesquisa /> */}

                        <Carrinho />
                    </View>

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
        paddingTop: 15,
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
    },

    funcionalidades: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        right: 0,
    }
});

const stylesModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'black',
        opacity: 0.86
    },
    modalView: {
        position: 'absolute',
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 200,
        width: 380
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#FF9933',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

const styleBody = StyleSheet.create({

    // Começo Campo pesquisa

    container_pesquisa: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    input_pesquisa: {
        borderRadius: 100,
        borderWidth: 2,
        width: 280,
        height: 50,
        paddingLeft: 15,
        marginRight: 16
    },

    icon_pesquisa: {
        backgroundColor: '#FF8616',
        padding: 12,
        marginRight: 20,
        borderRadius: 100
    },

    // Fim Campo pesquisa

})