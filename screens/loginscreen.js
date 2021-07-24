import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Pressable, TextInput, ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import background from '../assets/background.png';
import './global';

export default class loginScreen extends Component {
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
          <Text style={styles.title}>Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder={"E-mail"}
            onChangeText={(val) => {this.setEmail(val)}}
          />
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry={true}
            onChangeText={(val) => {this.setPassword(val)}}
          />
          <Text style={styles.tiny} onPress={this.passReset}>Forgot your password?</Text>
          <Text style={styles.error}>{this.state.errMessage}</Text>
          <Pressable style={styles.loginButton} onPress={this.handleClick}>
            <Text style={styles.buttonText} onPress={this.handleClick}>Log In</Text>
          </Pressable>
        </ImageBackground>
        <StatusBar barStyle="light-content" backgroundColor="white"/>
      </View>
    )
  }

  passReset = async() => {
    // Reset password
    // Direct them to reset page
    this.props.navigation.navigate('ForgotPass');
  }

  setEmail = async (val) => {
    global.email = val;
  }

  setPassword = async (val) => {
    global.password = val;
  }

  getIndivInfo = async() => {
    try {
      var info = {
        email_str: global.email.trim(),
        access_token_str: global.accessToken,
      }
      var jsonObj = JSON.stringify(info);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/get_profile_individual', 
        {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());
      
      // User was successfully registered
      if (res.success_bool == true) {
        console.log("Success gathering indiv info");
        global.accessToken = res.access_token_str;
        global.fullName = res.display_name_str;
        global.description = res.description_str;
        global.phone = res.phone_str;
        global.accessToken = res.refreshed_token_str;

        this.props.navigation.navigate('MainScreen');
      }
      else {
        console.log("Something went wrong when trying to get indiv info");
      }
    }
    catch {
      console.log("Something went wrong");
    }
  }

  getGroupInfo = async() => {
    try {
      var info = {
        email_str: global.email.trim(),
        access_token_str: global.accessToken,
      }
      var jsonObj = JSON.stringify(info);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/get_profile_group', 
        {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());
      
      // User was successfully registered
      if (res.success_bool == true) {
        console.log("Success gathering group info");
        global.accessToken = res.access_token_str;
        global.fullName = res.display_name_str;
        global.description = res.description_str;
        global.phone = res.phone_str;
        global.accessToken = res.refreshed_token_str;

        this.props.navigation.navigate('MainScreen');
      }
      else {
        console.log("Something went wrong when trying to get group info");
      }
    }
    catch {
      console.log("Something went wrong");
    }
  }

  handleClick = async() => {
    try {
      console.log("Email is: " + global.email + " Password is: " + global.password);
      var loginInfo = {
        email_str: global.email.trim(),
        password_str: global.password.trim(),
      }
      var jsonObj = JSON.stringify(loginInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/login', 
        {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());
      
      // User was successfully registered
      if (res.success_bool == true) {
        console.log("Login was successful");
        global.accessToken = res.access_token_str;
        global.group = res.is_group_bool;  

        // Add check for ready status of 1
        if (res.ready_status_int == 1)
        {
          // If it is then redirect them to fill out rest of profile info
          this.props.navigation.navigate('Info');
        }
        else
        {
          // Get profile information:
          // Project
          if (global.group == true) {
            this.getGroupInfo();
          }
          // Individual
          if (global.group == false) {
            this.getIndivInfo();
          }
          // console.log("setting fullname to: " + global.fullName);
          // console.log("setting description to: " + global.description);
          // console.log("setting phone to: " + global.phone);
          // this.props.navigation.navigate('MainScreen');
        }
      }
      else if (res.ready_status_int == 0) {
        console.log("Credentials are correct, but the account has not been verified");

        // Direct to email verification page
        this.props.navigation.navigate('VerifyCode');

        return;
      }
      else {
        console.log("Username/Password combination is incorrect");
        this.setState({ hasError: true });
        this.setState({ errMessage: "Username/Password is incorrect" });
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
  loginButton: {
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
  tiny: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    paddingTop: 15
  },
});