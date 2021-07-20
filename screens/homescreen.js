import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, Pressable } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import logo from '../assets/logo.png'
import background from '../assets/background.png'

export default class homeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>
            Kindle an Innovation
          </Text>
          <Text style={styles.subTitle}>
            The perfect team, the perfect idea, success awaits.
          </Text>
          <Pressable style={styles.loginButton} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>
          <Pressable style={styles.registerButton} onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 105, 
    height: 140
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    paddingTop: 30
  },
  subTitle: {
    textAlign: "center",
    width: 260,
    fontSize: 18,
    color: "white",
    paddingTop: 15
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: '#BF4342',
    height: 45,
    width: 175,
    borderRadius: 14,

    shadowColor: '#CB1809', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    elevation: 2, // Android
  },
  registerButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: '#FFA347',
    height: 45,
    width: 175,
    borderRadius: 14,

    shadowColor: '#FFA347', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    elevation: 2, // Android
  },
});
