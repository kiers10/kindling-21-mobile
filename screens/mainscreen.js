import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer , NavigationContainer } from 'react-navigation';
import { Pressable, Modal, ImageBackground, Image, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

import background from '../assets/background.png';
import person from '../assets/Person.png';
import logo from '../assets/FireLogo.png';
import menu from '../assets/Burger.png';
import reject from '../assets/reject.png';
import accept from '../assets/accept.png';

// Sample JSON data for matches 
let foo = {
  "success": true,
  "groupData": [{
    "title": "Website",
    "email": "email1@mail.com",
    "phone": "407-999-9999"
  }, {
      "title": "Website",
      "email": "email2@mail.com",
      "phone": "407-999-9999"
    }, {
      "title": "Website",
      "email": "email3@mail.com",
      "phone": "407-999-9999"
    }, {
      "title": "Website",
      "email": "email4@mail.com",
      "phone": "407-999-9999"
    }, {
    "title": "Website",
    "email": "email5@mail.com",
    "phone": "407-999-9999"
  }, {
    "title": "Website",
    "email": "email6@mail.com",
    "phone": "407-999-9999"
  }, {
    "title": "Website",
    "email": "email7@mail.com",
    "phone": "407-999-9999"
  }, {
    "title": "Website",
    "email": "email8@mail.com",
    "phone": "407-999-9999"
  }, {
    "title": "Website",
    "email": "email9@mail.com",
    "phone": "407-999-9999"
  }, {
    "title": "Website",
    "email": "email10@mail.com",
    "phone": "407-999-9999"
  },],
  "new_token": "prank_on_my_crazy_neighbor"
}

// Sample JSON data for candidates to be displayed on the card
let cand = {
  "success": true,
  "display_name_str": "Amazon Price Tracking Website",
  "description_str": "Looking for people that can help make a website for a local business",
  "phone_str": "407-999-1234",
  "refreshed_token_str": "testCrazy"
}

// Empty object array for match
// NOTE: this needs to be here since this creates the object array used in the 
// matches list (flatlist)
let matches = [];

for (let i = 0; i < foo.groupData.length; i++)
{
  let fifi = new Object;
  fifi.title = foo.groupData[i].title;
  fifi.email = foo.groupData[i].email;
  fifi.phone = foo.groupData[i].phone;
  matches.push(fifi);
}

// This is just how a sample data (object array) would look like that is used in the 
// flatlist (the list that we used for the matches array)
// const DATA = [
//   {
//     title: "Bookface Website",
//     contact: "contact1@bookface.com",
//     phone: "407-800-9999"
//   },
//   {
//     title: "Bookface Website",
//     contact: "contact2@bookface.com",
//     phone: "407-800-9999"
//   },
//   {
//     title: "Bookface Website",
//     contact: "contact3@bookface.com",
//     phone: "407-800-9999"
//   },
//   {
//     title: "Bookface Website",
//     contact: "contact4@bookface.com",
//     phone: "407-800-9999"
//   },
// ]

export default class mainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: global.fullName,
      phone: global.phone,
      description: global.description,
      hasError: false,
      errMessage: "",
      settingModalVisible: false,
      matchModalVisible: false,
      tempName: "",
      tempPhone: "",
      tempDescription: "",
    };
  }

  renderItem = ({ item }) => {
    return(
      <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: "gray", }}>
        <Text style={{ color: "#BF4342", fontWeight: "bold" }}>{item.title}</Text>
        <Text>{item.email}</Text>
        <Text>{item.phone}</Text>
      </View>
    )
  }

  setSettingModalVisible = (visible) => {
    this.setState({...Component, settingModalVisible: visible});
  }

  setMatchModalVisible = (visible) => {
    this.setState({...Component, matchModalVisible: visible});
  }

  setTempName = async (val) => {
    this.tempName = val;
    console.log(this.tempName);
  }

  setTempPhone = async (val) => {
    this.tempPhone = val;
    console.log(this.tempPhone);
  }

  setTempDescription = async (val) => {
    this.tempDescription = val;
    console.log(this.tempDescription);
  }

  handleClick = async() => {
    try {
      global.fullName = ((this.tempName == "") ? global.fullName : this.tempName.trim());
      global.phone = ((this.tempPhone == "") ? global.phone : this.tempPhone.trim());
      global.description = ((this.tempDescription == "") ? global.description : this.tempDescription.trim());

      console.log(global.fullName);
      console.log(global.phone);
      console.log(global.description);

      console.log(this.tempName == "");
      console.log(this.tempPhone == "");
      console.log(this.tempDescription == "");

      let updateInfo = {
        email_str: global.email.trim(),
        update_fields_obj: {
          display_name_str: global.fullName.trim(),
          phone_str: global.phone.trim(),
          description: global.description.trim(),
        },
        access_token_str: global.accessToken, 
      }

      let jsonObj = JSON.stringify(updateInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/update_profile', 
      {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());

      console.log("success boolean: " + res.success_bool);
      console.log(res.refreshed_token_str);

      if (res.success_bool == true) {
        global.accessToken = res.refreshed_token_str;
        global.fullName = (this.tempName === undefined) ? global.fullName : this.tempName.trim();
        global.phone = (this.tempPhone === undefined) ? global.phone : this.tempPhone.trim();
        global.description = (this.tempDescription === undefined) ? global.description : this.tempDescription.trim();

        let nameArr = global.fullName.split(" ");
        global.firstName = nameArr[0];
        global.lastName = nameArr[1];

        console.log("Profile info updated successfully");
      }
      else {
        console.log("Profile info updated failed :(");
      }
    }
    catch{
      console.log("something went wrong with the update_profile API");
    }
  }

  render() {
    const { settingModalVisible, matchModalVisible } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.row}>

            <Pressable style={styles.person} onPress={() => this.setSettingModalVisible(true)}>
              <Image source={person}></Image>
            </Pressable>

            <Image source={logo} style={styles.logo}></Image>

            <Pressable style={styles.menu} onPress={() => this.setMatchModalVisible(true)}>
              <Image source={menu}></Image>
            </Pressable>
          </View>

          <Modal visible={settingModalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={styles.mainHeader}>
                  <Text style={styles.modalSettingHeader}>Edit Settings</Text>
                  <Pressable onPress={() => this.setSettingModalVisible(false)}>
                    <Text style={styles.closeButton}>X</Text>
                  </Pressable>
                </View>

                <View style={styles.modalContent}>
                  <Text style={styles.modalHeader}>Name</Text>
                  <TextInput style={styles.modalInput} placeholder={this.state.name} onChangeText={(val) => {this.setTempName(val)}}></TextInput>
                  <Text style={styles.modalHeader}>Phone Number</Text>
                  <TextInput style={styles.modalInput} placeholder={this.state.phone} keyboardType={"number-pad"} onChangeText={(val) => {this.setTempPhone(val)}}></TextInput>
                  <Text style={styles.modalHeader} placeholder={this.state.description}>Description</Text>
                  <TextInput style={styles.modalDescription} multiline={true} onChangeText={(val) => {this.setTempDescription(val)}}></TextInput>

                  <View style={styles.buttonModal}>
                    <Pressable style={styles.button}>
                      <Text style={styles.buttonText} onPress={this.handleClick}>Save Changes</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                      <Text style={styles.buttonText}>Log Out</Text>
                    </Pressable>
                  </View>

                </View>
              </View>
            </View>
          </Modal>

          <Modal visible={matchModalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.mainHeader}>
                  <Text style={styles.modalMatchHeader}>Matches</Text>
                  <Pressable onPress={() => this.setMatchModalVisible(false)}>
                    <Text style={styles.closeMatchButton}>X</Text>
                  </Pressable>
                </View>

                <FlatList style={styles.flatListStyle}
                  data={matches}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.email}
                />
              </View>
            </View>
          </Modal>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{cand.display_name_str}</Text>
            <Text style={styles.cardDescription}>{cand.description_str}</Text>
          </View>

          <View style={styles.buttonRow}>
            <Pressable style={styles.rejectButton}>
              <Image source={reject}></Image>
            </Pressable>
            <Pressable style={styles.acceptButton}>
              <Image source={accept}></Image>
            </Pressable>
          </View>
        </ImageBackground>
        <StatusBar barStyle="light-content" backgroundColor="white"/>
      </View>
    )
  }

  getName = async() => {
    var fullName = global.firstName + " " + global.lastName;
    console.log("User's name is " + fullName);
    this.setState({ name: fullName });
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
  row: {
    flexDirection: 'row',
    marginTop: "10%",
  },
  person: {
    position: 'relative',
    marginRight: "0%",
    width: "15%",
  },
  logo: {
    marginLeft: "27%",
    marginRight: "25%",
  },
  menu: {
    marginTop: "3%",
    marginLeft: "4%",
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
  }, 
  modalHeader: {
    color: "#BF4342",
    fontSize: 25,
    marginBottom: 10,
  },
  modalSettingHeader: {
    color: "#BF4342",
    fontSize: 25,
    marginBottom: 10,
  },
  modalMatchHeader: {
    color: "#BF4342",
    fontSize: 25,
    marginBottom: 35,
    marginTop: 9,
  },
  modalContent: {
    paddingTop: "15%",
  },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between" 
  },
  modalInput: {
    borderColor: "#C6C4C4",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
  modalDescription: {
    borderColor: "#C6C4C4",
    borderWidth: 1,
    borderRadius: 10,
    height: "40%",
    textAlignVertical: "top",
    padding: "2%",
    marginBottom: 10,
  },
  button: {
    borderRadius: 14,
    width: "35%",
    height: "5%",
    backgroundColor: "#BF4342",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonModal: {
    justifyContent: "center", 
    alignItems: "center", 
    flexDirection: 'row',
  },
  closeButton: {
    fontSize: 30,
    fontWeight: "bold",
  },
  closeMatchButton: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#BF4342", 
    width: "85%", 
    height: "65%", 
    marginTop: "10%",
    borderRadius: 10,
    padding: 10,
    borderColor: "white",
    borderWidth: 1,
  },
  flatListStyle: {
    height: "95%",
  },
  cardTitle: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  cardDescription: {
    color: "white",
    fontSize: 15,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 20,
    marginRight: 20,
  },
  rejectButton: {
    marginRight: "45%",
  },
  acceptButton: {
    marginTop: 15,
  }
});