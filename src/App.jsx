import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Weather from './components/Weather'

export default function App() {
  return (
    <SafeAreaView style={styles.appContainer}>

    <StatusBar />

    <View style={styles.headerContainer}>
      <Text style={styles.headerTxt}>Weather App</Text>
    </View>


    <Weather />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#9fa8da',
    height: '100%'
  },
  headerContainer: {
    padding: 8,
    backgroundColor: '#9fa8da',
    elevation: 4
  },
  headerTxt: {
    color: '#283593',
    fontWeight: '900',
    fontFamily: 'cursive',
    fontSize: 28,
    textAlign: 'center'
  }
})