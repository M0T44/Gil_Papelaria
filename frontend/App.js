import React, { useState } from 'react'
import { SpeedDial } from '@rneui/themed';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  SafeAreaView,
  ImageBackground
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

function MultiOpcoes() {
  const [open, setOpen] = React.useState(false);
  return (
    <SpeedDial
      isOpen={open}
      icon={() => (
        <MaterialCommunityIcons
          name="format-align-justify"
          size={30}
          color="#fff"
        />
      )}
      openIcon={{ name: 'close', color: '#fff' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      buttonStyle={{ backgroundColor: '#FF8016' }}
    >
      <SpeedDial.Action
        icon={() => (
          <MaterialCommunityIcons
            name="exit-run"
            size={20}
            color="#fff"
          />
        )}
        title="Sair"
        onPress={() => console.log('Add Something')}
        buttonStyle={{ backgroundColor: '#FF8616' }}
      />
      <SpeedDial.Action
        icon={() => (
          <MaterialCommunityIcons
            name="account"
            size={20}
            color="#fff"
          />
        )}
        title="Login"
        onPress={() => console.log('Add Something')}
        buttonStyle={{ backgroundColor: '#FF8616' }}
      />
      <SpeedDial.Action
        icon={() => (
          <MaterialCommunityIcons
            name="account-plus"
            size={20}
            color="#fff"
          />
        )}
        title="Cadastre-Se"
        onPress={() => console.log('Add Something')}
        buttonStyle={{ backgroundColor: '#FF8616' }}
      />
      <SpeedDial.Action
        icon={() => (
          <MaterialCommunityIcons
            name="cog-outline"
            size={20}
            color="#fff"
          />
        )}
        title="Configurações"
        onPress={() => console.log('Delete Something')}
        buttonStyle={{ backgroundColor: '#FF8616' }}
      />
    </SpeedDial>
  )
}

function Navigation() {

  return (
    <SafeAreaView>
      <View style={styles.navigation}>
        <StatusBar bg="#00A3AD" barStyle="light-content" />
        <MultiOpcoes />
      </View>
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./imgs/fundo.jpg')}
        style={{ width: 450, height: 760 }}
      >
        <View>
          <Text>Papelaria do Gil</Text>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },

  navigation: {
    backgroundColor: '#00A3AD',
    height: 65,
  },
});
