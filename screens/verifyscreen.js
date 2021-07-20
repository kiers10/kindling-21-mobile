import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Pressable, TextInput, ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import background from '../assets/background.png';
import airplane from '../assets/airplane.png';
import './global';

export default class verifyScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: global.email,
        hasError: false,
        errMessage: "",
      };
    }
    render() {
      return (
        <View style={styles.container}>
          <ImageBackground source={background} style={styles.background}>
            <Text style={styles.title}>Please check your email</Text>
            <Image source={airplane} style={styles.airplane}></Image>
            <Text style={styles.subtitle}>A verification code has been sent to:</Text>
            <Text style={styles.emailtitle}>{this.state.email}</Text>
            <Text style={styles.subtitle}>Please type in the code below</Text>
            <TextInput
              style={styles.input}
              placeholder={"Verification Code"}
              onChangeText={(val) => {this.setVerifyCode(val)}}
            />
            <Text style={styles.tiny} onPress={this.resendVer}>Resend email verification</Text>
            <Text style={styles.error}>{this.state.errMessage}</Text>
            <Pressable style={styles.continueButton} onPress={this.handleClick}>
              <Text style={styles.buttonText} onPress={this.handleClick}>Continue</Text>
            </Pressable>
          </ImageBackground>
          <StatusBar barStyle="light-content" backgroundColor="white"/>
        </View>
      )
    }

    setVerifyCode = async (val) => {
      global.verifyCode = val;
    }

    resendVer = async() => {
      // console.log("Trying to send email to " + global.email.trim());
      try {
        var emailJSON = {
          email_str: global.email.trim()
        }
        var jsonObj = JSON.stringify(emailJSON);

        const response = await fetch('https://kindling-lp.herokuapp.com/api/send_verification_email', 
          {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

        var res = JSON.parse(await response.text());
        
        if (res.success_bool == true) {
          console.log("Email verification successfully sent to " + global.email);
        }
        else {
          console.log("Error sending email verification");
        }
      }
      catch {
        console.log("Something went wrong when sending email verification");
      }
    }

    handleClick = async() => {
      try {
        var verifyInfo = {
          code_str: global.verifyCode.trim() 
        }
        var jsonObj = JSON.stringify(verifyInfo);
  
        const response = await fetch('https://kindling-lp.herokuapp.com/api/verify_email', 
          {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});
  
        var res = JSON.parse(await response.text());

        if (res.success_bool == true) {
          console.log("Verification was successful");

          // Move to info screen
          this.props.navigation.navigate('Info');
        }
        else {
          console.log("Verification was unsuccessful");
          this.setState({ errMessage: "Verification code is incorrect" });
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
      fontSize: 18,
      color: "white",
      fontWeight: "bold",
      paddingTop: 35
    },
    emailtitle: {
      fontSize: 18,
      color: "#F4D06F",
      fontWeight: "bold",
      paddingTop: 10
    },
    airplane: {
      marginTop: 30,
      width: 175,
      height: 175
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
      marginTop: 50,
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
    tiny: {
      fontSize: 15,
      color: "#F4D06F",
      fontWeight: "bold",
      paddingTop: 15
    },
    error: {
      textAlign: "center",
      marginTop: 20,
      color: "#E96C6B",
      fontWeight: "bold",
      fontSize: 18,
    },
  });