import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Pressable, ImageBackground, StyleSheet, Text, View } from 'react-native';
import background from '../assets/background.png';

const project = global.group;

export default class infoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDev: false,
      marketing: false,
      appDev: false,
      networking: false,
      webDev: false,
      construction: false,
      robotics: false,
      labPartners: false,
      graphicDesign: false,
      research: false,
      writer: false,
      other: false,
      hasError: false,
      errMessage: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <Text style={styles.projectTitle}>{project ? "Tell us about your project" : "Select your interests"}</Text>
          <View style={styles.optionsContainer}>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleGameDev}
              backgroundColor={this.state.gameDev ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleGameDev}
                >Game Dev</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleMarketing}
              backgroundColor={this.state.marketing ?  "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleMarketing}
                >Marketing</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleAppDev}
              backgroundColor={this.state.appDev ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleAppDev}
                >App Dev</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleNetworking}
              backgroundColor={this.state.networking ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleNetworking}
                >Networking</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleWebDev}
              backgroundColor={this.state.webDev ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleWebDev}
                >Web Dev</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleConstruction}
              backgroundColor={this.state.construction ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleConstruction}
                >Construction</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleRobotics}
              backgroundColor={this.state.robotics ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleRobotics}
                >Robotics</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleLabPartners}
              backgroundColor={this.state.labPartners ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleLabPartners}
                >Lab Partners</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleGraphicDesign}
              backgroundColor={this.state.graphicDesign ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleGraphicDesign}
                >Graphic Design</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleResearch}
              backgroundColor={this.state.research ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleResearch}
                >Research</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleWriter}
              backgroundColor={this.state.writer ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleWriter}
                >Writer</Text>
            </Pressable>
            <Pressable style={styles.optionsButton}
              onPress={this.toggleOther}
              backgroundColor={this.state.other ? "#F4D06F" : "white"}
              >
                <Text 
                style={styles.buttonText}
                onPress={this.toggleOther}
                >Other</Text>
            </Pressable>
          </View>
          <Text style={styles.error}>{this.state.errMessage}</Text>
          <Pressable style={styles.continueButton} onPress={this.handleClick}>
                <Text style={styles.continueButtonText} onPress={this.handleClick}>Continue</Text>
          </Pressable>
        </ImageBackground>
        <StatusBar barStyle="light-content" backgroundColor="white"/>
      </View>
    )

    
  }

  handleClick = async() => {
    // Simulate log in to get access token
    this.login();

    // Check to make sure at least one option is selected
    this.checkOptions();
    console.log("has error is " + this.state.hasError);
    if (this.state.hasError == true)
    {
      // Print error message
      console.log("Please select at least one option");
      this.setState({ errMessage: "Please select at least one option" });
      return;
    }

    else {
      // Move to verify code screen
      this.props.navigation.navigate('Description');
    }
  }

  checkOptions = async() => {
    if (global.gameDev == true)
    {
      this.state.hasError = false;
      console.log("game dev on");
      return;
    }
    else if (global.marketing == true)
    {
      this.state.hasError = false;
      console.log("marketing on");
      return;
    }
    else if (global.appDev == true)
    {
      this.state.hasError = false;
      console.log("app dev on");
      return;
    }
    else if (global.networking == true)
    {
      this.state.hasError = false;
      console.log("networking on");
      return;
    }
    else if (global.webDev == true)
    {
      this.state.hasError = false;
      console.log("web dev on");
      return;
    }
    else if (global.construction == true)
    {
      this.state.hasError = false;
      console.log("construction on");
      return;
    }
    else if (global.robotics == true)
    {
      this.state.hasError = false;
      console.log("robotics on");
      return;
    }
    else if (global.labPartners == true)
    {
      this.state.hasError = false;
      console.log("lab partners on");
      return;
    }
    else if (global.graphicDesign == true)
    {
      this.state.hasError = false;
      console.log("graphic design on");
      return;
    }
    else if (global.research == true)
    {
      this.state.hasError = false;
      console.log("research on");
      return;
    }
    else if (global.writer == true)
    {
      this.state.hasError = false;
      console.log("writer on");
      return;
    }
    else if (global.other == true)
    {
      this.state.hasError = false;
      console.log("other on");
      return;
    }
    else
    {
      console.log("Nothing selected");
      this.state.hasError = true;
      return;
    }
  }

  login = async() => {
    try {
      // console.log("Email is: " + global.email + " Password is: " + global.password);
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
        // console.log("Login was successful");
        global.accessToken = res.access_token_str;
        global.group = res.is_group_bool;
      }
      else {
        // console.log("Login was unsuccessful");
        // A user with this email already exists
        return;
      }
    }
    catch {
      console.log("Something went wrong");
    }
  }

  toggleGameDev = async() => {
    if (this.state.gameDev == false) {
      this.setState({ gameDev: true });
      this.state.gameDev = true;
      global.gameDev = true;
      console.log("this.state.gameDev changed to " + this.state.gameDev);
    }
    else {
      this.setState({ gameDev: false });
      this.state.gameDev = false;
      global.gameDev = false;
      console.log("this.state.gameDev changed to " + this.state.gameDev);

    }
  }
  toggleMarketing = async() => {
    if (this.state.marketing == false) {
      this.setState({ marketing: true });
      this.state.marketing = true;
      global.marketing = true;
    }
    else {
      this.setState({ marketing: false });
      this.state.marketing = false;
      global.marketing = false;
    }
  }
  toggleAppDev = async() => {
    if (this.state.appDev == false) {
      this.setState({ appDev: true });
      this.state.appDev = true;
      global.appDev = true;
    }
    else {
      this.setState({ appDev: false });
      this.state.appDev = false;
      global.appDev = false;
    }
  }
  toggleNetworking = async() => {
    if (this.state.networking == false) {
      this.setState({ networking: true });
      this.state.networking = true;
      global.networking = true;
    }
    else {
      this.setState({ networking: false });
      this.state.networking = false;
      global.networking = false;
    }
  }
  toggleWebDev = async() => {
    if (this.state.webDev == false) {
      this.setState({ webDev: true });
      this.state.webDev = true;
      global.webDev = true;
    }
    else {
      this.setState({ webDev: false });
      this.state.webDev = false;
      global.webDev = false;
    }
  }
  toggleConstruction = async() => {
    if (this.state.construction == false) {
      this.setState({ construction: true });
      this.state.construction = true;
      global.construction = true;
    }
    else {
      this.setState({ construction: false });
      this.state.construction = false;
      global.construction = false;
    }
  }
  toggleRobotics = async() => {
    if (this.state.robotics == false) {
      this.setState({ robotics: true });
      this.state.robotics = true;
      global.robotics = true;
    }
    else {
      this.setState({ robotics: false });
      this.state.robotics = false;
      global.robotics = false;
    }
  }
  toggleLabPartners = async() => {
    if (this.state.labPartners == false) {
      this.setState({ labPartners: true });
      this.state.labPartners = true;
      global.labPartners = true;
    }
    else {
      this.setState({ labPartners: false });
      this.state.labPartners = false;
      global.labPartners = false;
    }
  }
  toggleGraphicDesign = async() => {
    if (this.state.graphicDesign == false) {
      this.setState({ graphicDesign: true });
      this.state.graphicDesign = true;
      global.graphicDesign = true;
    }
    else {
      this.setState({ graphicDesign: false });
      this.state.graphicDesign = false;
      global.graphicDesign = false;
    }
  }
  toggleWriter = async() => {
    if (this.state.writer == false) {
      this.setState({ writer: true });
      this.state.writer = true;
      global.writer = true;
    }
    else {
      this.setState({ writer: false });
      this.state.writer = false;
      global.writer = false;
    }
  }
  toggleResearch = async() => {
    if (this.state.research == false) {
      this.setState({ research: true });
      this.state.research = true;
      global.research = true;
    }
    else {
      this.setState({ research: false });
      this.state.research = false;
      global.research = false;

    }
  }
  toggleOther = async() => {
    if (this.state.other == false) {
      this.setState({ other: true });
      this.state.other = true;
      global.other = true;
    }
    else {
      this.setState({ other: false });
      this.state.other = false;
      global.other = false;
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
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    paddingTop: 125,
    paddingBottom: 35
  },
  projectTitle: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    paddingTop: 45,
    paddingBottom: 15
  },
  optionsContainer: {
    flex: 1,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  optionsButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "white",
    height: 50,
    width: 155,
    borderRadius: 14,

    shadowColor: "black", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    elevation: 2, // Android
  },
  continueButton: {
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 100,
    marginBottom: 55,
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
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    marginBottom: 65,
    color: "#E96C6B",
    fontWeight: "bold",
    fontSize: 18,
  }
});