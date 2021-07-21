import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Pressable, TextInput, ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import background from '../assets/background.png';
import './global';

export default class forgotScreen extends Component {
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
          <Text style={styles.title}>Forgot your password?</Text>
          <Text style={styles.subtitle}>Please enter the email you use to sign in below</Text>
          <TextInput
            style={styles.input}
            placeholder={"E-mail"}
            onChangeText={(val) => {this.setEmail(val)}}
          />
          <Text style={styles.error}>{this.state.errMessage}</Text>
          <Pressable style={styles.continueButton} onPress={this.handleClick}>
            <Text style={styles.buttonText} onPress={this.handleClick}>Send reset code</Text>
          </Pressable>
        </ImageBackground>
        <StatusBar barStyle="light-content" backgroundColor="white"/>
      </View>
    )
  }

  setEmail = async (val) => {
    global.email = val;
  }

  handleClick = async() => {
    try {
      var loginInfo = {
        email_str: global.email.trim(),
      }
      var jsonObj = JSON.stringify(loginInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/send_password_reset', 
        {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());
      
      // User was successfully registered
      if (res.success_bool == true) {
        console.log("Password reset code sent successful");

        // Direct them to reset page
        this.props.navigation.navigate('NewPass');
      }
      else {
        console.log("Email is incorrect");
        this.setState({ hasError: true });
        this.setState({ errMessage: "User with this email does not exist" });
        return;
      }
    }
    catch {
      console.log("Something went wrong");
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
    fontSize: 30,
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