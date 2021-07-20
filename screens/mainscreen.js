import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer , NavigationContainer } from 'react-navigation';
import { Pressable, Modal, ImageBackground, Image, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

import background from '../assets/background.png';
import person from '../assets/Person.png';
import logo from '../assets/FireLogo.png';
import menu from '../assets/Burger.png';

let foo = {
  "success": true,
  "groupData": [{
    "title": "Website",
    "contact": "email1@mail.com",
    "phone": "407-999-9999"
  }, {
      "title": "Website",
      "contact": "email2@mail.com",
      "phone": "407-999-9999"
    }, {
      "title": "Website",
      "contact": "email3@mail.com",
      "phone": "407-999-9999"
    }, {
      "title": "Website",
      "contact": "email4@mail.com",
      "phone": "407-999-9999"
    },],
  "new_token": "prank_on_my_crazy_neighbor"
}

// NOTE: this needs to be here since this creates the object array used in the 
// matches list (flatlist)
let crazy = [];

for (let i = 0; i < foo.groupData.length; i++)
{
  let fifi = new Object;
  fifi.title = foo.groupData[i].title;
  fifi.contact = foo.groupData[i].contact;
  fifi.phone = foo.groupData[i].phone;
  crazy.push(fifi);
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
      name: global.firstName,
      hasError: false,
      errMessage: "",
      settingModalVisible: false,
      matchModalVisible: false,
    };
  }

  renderItem = ({ item }) => {
    return(
      <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: "gray", }}>
        <Text style={{ color: "#BF4342", fontWeight: "bold" }}>{item.title}</Text>
        <Text>{item.contact}</Text>
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
                  <TextInput style={styles.modalInput} placeholder={"Name"}></TextInput>
                  <Text style={styles.modalHeader}>Phone Number</Text>
                  <TextInput style={styles.modalInput} placeholder={"Phone Number"} keyboardType={"number-pad"}></TextInput>
                  <Text style={styles.modalHeader}>Description</Text>
                  <TextInput style={styles.modalDescription} multiline={true}></TextInput>

                  <View style={styles.buttonModal}>
                    <Pressable style={styles.button}>
                      <Text style={styles.buttonText}>Save Changes</Text>
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

                <FlatList 
                  data={crazy}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.contact}
                />
              </View>
            </View>
          </Modal>
          
          <View style={{ backgroundColor: "#BF4342", width: "85%", height: "65%", marginTop: "10%" }}>
            <Text style={{ color: "white" }}>This is a test</Text>
            <Text style={{ color: "#fff" }}>Kiersten is so cute</Text>
          </View>
        </ImageBackground>
        <StatusBar barStyle="light-content" backgroundColor="white"/>
      </View>
    )
  }

  // getName = async() => {
  //   var fullName = global.firstName + " " + global.lastName;
  //   console.log(fullName);
  //   this.setState({ name: fullName });
  // }
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
  }
});