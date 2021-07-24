import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Switch, ImageBackground, StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import background from '../assets/background.png';
import './global';

export default class registerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: true,
      hasError: false,
      errMessage: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <Text style={styles.title}>
            Create a new account
          </Text>
          <View style={styles.nameInputFields}>
            <TextInput
              style={styles.nameInput}
              placeholder={"First Name"}
              onChangeText={(val) => {this.setFirst(val)}}
            />
            <TextInput
              style={styles.nameInput}
              placeholder={"Last Name"}
              onChangeText={(val) => {this.setLast(val)}}
            />
            <TextInput
              style={styles.input}
              keyboardType={"number-pad"}
              placeholder={"Phone Number"}
              onChangeText={(val) => {this.setPhone(val)}}
            />
            <TextInput
              style={styles.input}
              placeholder={"E-mail"}
              onChangeText={(val) => {this.setEmail(val)}}
            />
            <TextInput
              style={styles.input}
              placeholder={"Password"}
              onChangeText={(val) => {this.setPassword(val)}}
            />
            <TextInput
              style={styles.input}
              placeholder={"Confirm Password"}
              onChangeText={(val) => {this.setConfirmPassword(val)}}
            /> 
            <Text style={styles.groupTitle}>What are you looking for?</Text>
            <Text style={[styles.toggleText, styles.projectText]}>Project</Text>
            <Switch
              style={styles.toggle}
              trackColor={{ false: "#FFA347", true: "#BF4342" }}
              thumbColor={this.state.isEnabled ? "#FFFFFF" : "#FFFFFF"}
              
              ios_backgroundColor="#FFA347"
              onValueChange={this.toggleSwitch}
              value={this.state.isEnabled}
              >
            </Switch>
            <Text style={[styles.toggleText, styles.individualText]}>Individual</Text>
            <Text style={styles.error}>{this.state.errMessage}</Text>
            <Pressable style={styles.registerButton} onPress={this.checkPassword}>
              <Text 
                style={styles.buttonText} onPress={this.checkPassword}>
                Sign up
              </Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }

  toggleSwitch = () => {
    if (this.state.isEnabled == false) {
      this.setState({ isEnabled: true });
      this.state.isEnabled = true;
      // Set the group status
      this.group = true;
    }
    else {
      this.setState({ isEnabled: false });
      this.state.isEnabled = false;
      this.group = false;
    }
    console.log("isEnabled is " + this.state.isEnabled);
  }

  handleClick = async() => {
    try {
      // console.log("Sending email: " + global.email + " and password: " + global.password);
      var displayName = global.firstName + " " + global.lastName;

      var registerInfo = {
        email_str: global.email.trim(),
        password_str: global.password.trim(),
        display_name_str: displayName,
        phone_str: global.phone,
        is_group_bool: true
      }
      var jsonObj = JSON.stringify(registerInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/register', 
        {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());

      // User was successfully registered
      if (res.success_bool == true) {
        // console.log("Registration was successful");

        // Handle email verification
        this.sendEmailVerification();

        // Move to verify code screen
        this.props.navigation.navigate('VerifyCode');
      }
      else {
        console.log("Registration was unsuccessful");
        // A user with this email already exists
        this.setState({ errMessage: "User with this email already exists" });
        return;
      }
    }
    catch {
      console.log("Something went wrong when registering");
    }
  }

  sendEmailVerification = async() => {
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

  setFirst = async (val) => {
    global.firstName = val;
  }

  setLast = async (val) => {
    global.lastName = val;
  }

  setPhone = async (val) => {
    global.phone = val;
  }
  
  setEmail = async (val) => {
    global.email = val;
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
      // Try to register
      this.handleClick();
    }
    // The passwords do not match
    else {
      console.log("Passwords do not match");
      this.setState({ errMessage: "Passwords do not match" });
    }
  }
}

// Styling
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
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    paddingTop: 115
  },
  groupTitle: {
    textAlign: "center",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 20,
  },
  nameInputFields: {
    flex: 1,
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  nameInput: {
    backgroundColor: '#fff',
    height: 50,
    paddingLeft: 15,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 1,
    width: "45%",
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    paddingLeft: 15,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 1,
    width: "95%",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  registerButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
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
  groupToggle: {
    maxHeight: "6%",
    // borderColor: "red",
    // borderWidth: 2,
    flex: 1,
    flexDirection: "row",
    
  }, 
  toggle: {
    transform: [{scale: 1.25}],
  }, 
  toggleText: {
    color: "white",
    fontSize: 25,
  },
  projectText: {
    color: "#E25150",
    marginRight: 20,
  },
  individualText: {
    color: "#FFA347",
    marginLeft: 20,
  },
  error: {
    textAlign: "center",
    marginTop: 35,
    color: "#E96C6B",
    fontWeight: "bold",
    fontSize: 18,
  },
});
