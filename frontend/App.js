import React, { useState } from 'react'
import { SpeedDial } from '@rneui/themed';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

function Header() {
  return (

    <ScrollView stickyHeaderIndices={[1]}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <View style={styleHeader.container}>
          <View style={styleHeader.logo}>
            <Image
              style={styleHeader.logoImagem}
              source={require('./imgs/logo.png')}
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
            onPress={() => console.log('Add Something')}
            buttonStyle={{ backgroundColor: '#FF8616' }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

function Navigation() {
  return (
    <SafeAreaView>
      <View style={styles.container_navigation}>
        <StatusBar barStyle="light-content" />
        <MultiOpcoes />
      </View>
    </SafeAreaView>
  )
}

function MultiOpcoes() {
  const [open, setOpen] = React.useState(false);
  return (
    <SpeedDial
      style="multiOpcoes"
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

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },

  container_navigation: {
    justifyContent: 'center',
    height: 80,
  },

  navigation_botao: {
    flex: 1,
    backgroundColor: 'red',
  },

  speedDrialEsquerda: {
    transform: [{ scaleX: -1 }],
  }
});

const styleHeader = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    textAlign: 'center',
  },
  
  logo: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: 'wrap',
    width: 120,
    height: 60
  },

  logoImagem: {
    width: 180,
    height: 180
  },

  carinho: {
    justifyContent: 'flex-end',
    alignItems: 'center', 
    width: 120,
    height: 60,
  }
});