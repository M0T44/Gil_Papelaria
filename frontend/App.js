import React, { useState } from 'react'
import { SpeedDial } from '@rneui/themed';
import Swiper from 'react-native-swiper';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  FlatList
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
// import caderno from "./imgs/caderno.png"

// Começo Header
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
// Fim Header

// Começo Body 
function Body() {

  const data = [
    { id: '1', imagemCss: styleBody.imagemBanner, imageUrl: require('./imgs/banner1.png') },
    { id: '2', imagemCss: styleBody.imagemProdutos, imageUrl: require('./imgs/caderno.png') },
    { id: '3', imagemCss: styleBody.imagemProdutos, imageUrl: require('./imgs/caneta.png')}
  ]

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styleBody.container}>
          <Carousel data={data} />
          <Card />
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

function Carousel({ data }) {
  return (
    <Swiper showsButtons={true} loop={true} style={styleBody.swiper}>
      {data.map((item) => (
        <View style={styleBody.container_carousel} key={item.id}>
          <View style={styleBody.carouselItem}>
            <Image source={item.imageUrl} style={item.imagemCss} />
          </View>
        </View>
      ))}
    </Swiper>
  )
}

function Card() {
  return (
    <View style={styleBody.container_card}>
      <View style={styleBody.card}>
        <Image
          source={require('./imgs/caderno.png')}
        />
        <Text>
          Card
        </Text>
      </View>

      <View style={styleBody.card}>
        <Image
          source={require('./imgs/caderno.png')}
        />
        <Text>
          Card
        </Text>
      </View>
    </View>
  )
}
// Fim Body

// Começo Navigation
function Navigation() {
  return (
    <SafeAreaView>
      <View style={styleNavigation.container_navigation}>
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

// Fim Navigation
export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

const styleHeader = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    textAlign: 'center',
    // backgroundColor: 'black'
  },

  logo: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: 'wrap',
    width: 130,
    height: 80,
    margin: 20
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

const styleBody = StyleSheet.create({
  container: {
    flex: 2,
  },

  // Começo Carroussel
  swiper: {
    height: 260
  },

  carouselItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 200,
    marginVertical: 16
  },

  imagemBanner: {
    width: 400,
    height: 250,
  },

  imagemProdutos: {
    width: 200,
    height: 200
  },

  // Fim Carroussel

  // Começo Card

  container_card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  card: {
    height: 200,
    marginVertical: 16,
  }
  // Fim Card
})

const styleNavigation = StyleSheet.create({
  container_navigation: {
    justifyContent: 'center',
    height: 80,
  },

  navigation_botao: {
    flex: 3,
    backgroundColor: 'red',
  },

  speedDrialEsquerda: {
    transform: [{ scaleX: -1 }],
  }
})
