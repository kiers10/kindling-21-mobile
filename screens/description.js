import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, NavigationContainer } from 'react-navigation';
import { Pressable, Button, TextInput, ImageBackground, Image, StyleSheet, Text, View, Keyboard } from 'react-native';
import background from '../assets/background.png';
import ProfilePicture from './profilepicture';

global.pfpError = false;

export default class descriptionScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background}> 
          <ProfilePicture/>
            <Text style={styles.title}>{global.fullName}</Text>
          <Text style={styles.title}>{global.group ? "Tell us about your project" : "Tell us about yourself"}</Text>
          <TextInput
            style={styles.input} multiline={true} editable={true}
            onChangeText={(val) => {this.setDescription(val)}}
            onSubmitEditing={Keyboard.dismiss}
            placeholder={"Type your description here."}
          />
          <Pressable style={styles.continueButton} onPress={this.handleClick}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </ImageBackground>
        <StatusBar barStyle="light-content" backgroundColor="white" />
      </View>
    )
  }

  // FIXME: THIS WAS COMMENTED
  setProfilePicture = async() => {
    try {
      console.log("image uri: " + global.picture);
      let data = new FormData();
      data.append('profile_picture', {uri : global.picture, type : "image/jpeg", name: "photo.jpg"});
      data.append('email_str', global.email.trim());
      data.append('access_token_str', global.accessToken);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/upload_profile_picture', 
        {method:'POST', body:data, headers:{'Content-Type':'multipart/form-data'}});

      var res = JSON.parse(await response.text());

      if (res.success_bool == true) {
        global.accessToken = res.refreshed_token_str;
        console.log("Success setting profile picture");
      }
      else {
        global.pfpError = false;
        console.log("Setting profile picture unsuccessful");
        console.log("Error code: " + res.error_code_int);
      }
    }
    catch {
      console.log("Something went wrong when setting profile picture");
    }
  }

  setDescription = async(val) => {
    global.description = val;
  }

  initializeGroup = async() => {
    // FIXME: THIS WAS COMMENTED
    this.setProfilePicture();
    // if (global.pfpError == false) {
    //   return;
    // }

    console.log("Starting to set bools");
    try {
      var profileInfo = {
        email_str: global.email.trim(),
        group_categories_obj: {
        },
        description_str: global.description,
        candidate_individual_categories_obj: {
          game_development_bool: global.gameDev,
          app_development_bool: global.appDev,
          web_development_bool: global.webDev,
          robotics_bool: global.robotics,
          graphic_design_bool: global.graphicDesign,
          writer_bool: global.writer,
          marketing_bool: global.marketing,
          networking_bool: global.networking,
          construction_bool: global.construction,
          lab_partners_bool: global.labPartners,
          research_bool: global.research,
          other_bool: global.other
        },
        access_token_str: global.accessToken,
      }
      var jsonObj = JSON.stringify(profileInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/initialize_profile_group', 
        {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.success_bool == true) {
        global.accessToken = res.refreshed_token_str;
        console.log("Setting profile info successful");
        this.props.navigation.navigate('MainScreen');
      }
      else {
        console.log("Setting profile info unsuccessful");
      }
    }
    catch {
      console.log("Something went wrong");
    }
  }

  initializeIndiv = async() => {
    this.setProfilePicture();
    if (global.pfpError == false) {
      return;
    }

    console.log("Starting to set bools");
    try {
      var profileInfo = {
        email_str: global.email.trim(),
        individual_categories_obj: {
        },
        description_str: global.description,
        candidate_group_categories_obj: {
          game_development_bool: global.gameDev,
          app_development_bool: global.appDev,
          web_development_bool: global.webDev,
          robotics_bool: global.robotics,
          graphic_design_bool: global.graphicDesign,
          writer_bool: global.writer,
          marketing_bool: global.marketing,
          networking_bool: global.networking,
          construction_bool: global.construction,
          lab_partners_bool: global.labPartners,
          research_bool: global.research,
          other_bool: global.other
        },
        access_token_str: global.accessToken,
      }
      var jsonObj = JSON.stringify(profileInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/initialize_profile_individual', 
        {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.success_bool == true) {
        global.accessToken = res.refreshed_token_str;
        console.log("Setting profile info successful");
        this.props.navigation.navigate('MainScreen');
      }
      else {
        console.log("Setting profile info unsuccessful");
      }
    }
    catch {
      console.log("Something went wrong");
    }
  }

  handleClick = async() => {
    if (global.group == true) {
      console.log("User signed up as project");
      this.initializeGroup();
    }
    else {
      console.log("User signed up as individual");
      this.initializeIndiv();
    }
    console.log("Out of initialize calls");
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

    alignItems: "center"
  },
  title: {
    fontSize: 25,
    color: "white",
    paddingTop: 10,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    height: "5%",
    margin: 13,
    borderWidth: 1,
    borderRadius: 1,
    width: "75%",
    paddingLeft: 15,
    paddingTop: 15,
    borderRadius: 10,
    textAlignVertical: "top",
  },
  continueButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
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
    color: "white",
    fontWeight: "bold",
  },
});