import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Pressable, TextInput, ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import background from '../assets/background.png';
import './global';

export default class resetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errMessage: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <Text style={styles.title}>Create your new password</Text>
          <TextInput
              style={styles.input}
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={(val) => {this.setPassword(val)}}
            />
            <TextInput
                style={styles.input}
                placeholder={"Confirm Password"}
                secureTextEntry={true}
                onChangeText={(val) => {this.setConfirmPassword(val)}}
            /> 
          <Text style={styles.error}>{this.state.errMessage}</Text>
          <Pressable style={styles.continueButton} onPress={this.checkPassword}>
            <Text style={styles.buttonText} onPress={this.checkPassword}>Reset password</Text>
          </Pressable>
        </ImageBackground>
        <StatusBar barStyle="light-content" backgroundColor="white"/>
      </View>
    )
  }

  setPassword = async (val) => {
    global.password = val;
  }

  setConfirmPassword = async (val) => {
    global.confirmPass = val;
  }

  checkPassword = () => {
    // The entered passwords match
    if (password.localeCompare(confirmPass) == 0) {
      // Move to reset code verication screen
      this.props.navigation.navigate('PassReset');
    }
    // The passwords do not match
    else {
      console.log("Passwords do not match");
      this.setState({ errMessage: "Passwords do not match" });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    paddingTop: 125
  },
  subtitle: {
    fontSize: 15,
    color: "white",
    // fontWeight: "bold",
    paddingTop: 15
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    paddingLeft: 15,
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 1,
    width: "75%",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  continueButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
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
  error: {
    textAlign: "center",
    marginTop: 25,
    color: "#E96C6B",
    fontWeight: "bold",
    fontSize: 18,
  },
});