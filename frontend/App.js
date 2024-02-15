import React, { useState } from 'react'
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  SafeAreaView,
  ImageBackground
} from 'react-native';

function Navigation() {
  return (
    <View>
      <StatusBar bg="#00A3AD" barStyle="light-content" />
      <Text>
        teste
      </Text>
    </View>
  )
}

export default function App() {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./imgs/fundo.avif')}
        style={{ width: 400, height: 400 }}
      />
      <View style={styles.container}>
        <Text>Papelaria do Gil</Text>
        <StatusBar style="auto" />
      </View>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
