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

import Configuracoes from './pages/Configuracoes';
import Cadastre_se from './pages/Cadastro';
import Carrinho from './pages/Carrinho';

const Drawer = createDrawerNavigator()

// Começo Header
function Header() {
  const navigation = useNavigation();
  return (
    <ScrollView stickyHeaderIndices={[1]}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <View style={styleHeader.container}>
          <View style={styleHeader.logo}>
            <Image
              style={styleHeader.logoImagem}
              source={require('./imgs/logo.png')}
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
// Fim Header

// Começo Body 
function Body() {

  const data = [
    { id: '1', imagemCss: styleBody.imagemBanner, imageUrl: require('./imgs/banner1.png') },
    { id: '2', imagemCss: styleBody.imagemBanner2, imageUrl: require('./imgs/banner2.png') },
    { id: '3', imagemCss: styleBody.imagemProdutos, imageUrl: require('./imgs/caneta.png') }
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
        <View style={styleBody.card_info}>
          <Text>
            Caderno Inteligente
          </Text>
          <TouchableOpacity style={styleBody.card_button} onPress={() => console.log('Botão pressionado')}>
            <Text style={styleBody.buttonText}>Add ao Carrinho</Text>
            <MaterialCommunityIcons name="cart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styleBody.card}>
        <Image
          source={require('./imgs/caneta.png')}
        />
        <View style={styleBody.card_info}>
          <Text>
            Caneta Mágica
          </Text>
          <TouchableOpacity style={styleBody.card_button} onPress={() => console.log('Botão pressionado')}>
            <Text style={styleBody.buttonText}>Add ao Carrinho</Text>
            <MaterialCommunityIcons name="cart" size={24} color="white" />
          </TouchableOpacity>
        </View>
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
        <StatusBar />
        <MultiOpcoes />
      </View>
    </SafeAreaView>
  )
}

function MultiOpcoes() {
  const navigation = useNavigation();
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
            name="home"
            size={20}
            color="#fff"
          />
        )}
        title="Home"
        onPress={() => navigation.navigate('Body')}
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
        onPress={() => navigation.navigate('Cadastre_se')}
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
        onPress={() => navigation.navigate('Configuracoes')}
        buttonStyle={{ backgroundColor: '#FF8616' }}
      />

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

    </SpeedDial>
  )
}
// Fim Navigation

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ header: (props) => <Header {...props} /> }}>
        <Drawer.Screen name='Body' component={Body} />
        <Drawer.Screen name='Configuracoes' component={Configuracoes} />
        <Drawer.Screen name='Cadastre_se' component={Cadastre_se} />
        <Drawer.Screen name='Carrinho' component={Carrinho} />
      </Drawer.Navigator>
      <Navigation />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red'
  }
});

const styleHeader = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    textAlign: 'center',
    backgroundColor: '#fff',
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
    marginTop: 15,
  }
});

const styleBody = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff'
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

  imagemBanner2: {
    width: 450,
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
    alignItems: 'center',
  },

  card: {
    borderWidth: 2,           // Largura da borda
    borderColor: '#BDB9B9',     // Cor da borda
    borderRadius: 10,          // borda arredondada
    padding: 15,              // espacamento 
    margin: 6,
    width: 250,
    height: 300,
    // marginVertical: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  card_info: {
    marginTop: 16,
    width: 220,
    height: 70,
    alignItems: 'center'
  },

  card_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#FF8616',
    padding: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: 'white',
    marginRight: 10
  }

  // Fim Card
})

const styleNavigation = StyleSheet.create({
  container_navigation: {
    height: 80,
    backgroundColor: 'red'
  },

  navigation_botao: {
    flex: 3,
  },
})
