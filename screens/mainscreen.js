import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer , NavigationContainer } from 'react-navigation';
import { Pressable, Modal, ImageBackground, Image, StyleSheet, Text, View, TextInput, FlatList, Keyboard } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import background from '../assets/background.png';
import person from '../assets/Person.png';
import logo from '../assets/FireLogo.png';
import bigLogo from '../assets/bigLogo.png';
import menu from '../assets/Burger.png';
import reject from '../assets/reject.png';
import accept from '../assets/accept.png';

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
      newMatchModalVisible: false,
      tempName: "",
      tempPhone: "",
      tempDescription: "",
      candEmail: "",
      candDisplay: "",
      candDesc: "",
      matchDisplay: "",
      matchEmail: "",
      matchPhone: "",
      matchesArray: [],
      candArray: [
                  {test: "test"},
      ],
      swipePerm: true,
    };
    this.handleYup = this.handleYup.bind(this);
    this.acceptFunction = this.acceptFunction.bind(this);
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

  renderCard = () => {
    return(
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{this.state.candDisplay}</Text>
        <Text style={styles.cardDescription}>{this.state.candDesc}</Text>
      </View>
    )
  }

  logOutFunction = async() => {
    try {
      global.email = "";
      global.password = "";
      global.confirmPass = "";
      global.firstName = "";
      global.lastName = "";
      global.fullName = "";
      global.phone = "";

      // Variable to keep track of which group the user wants to join
      // True: Project
      // False: Individual
      global.group = true;

      // Variable to store the user's unique access token
      global.accessToken = "";

      global.verifyCode = "";

      global.gameDev = false;
      global.marketing = false;
      global.appDev = false;
      global.networking = false;
      global.webDev = false;
      global.construction = false;
      global.robotics = false;
      global.labPartners = false;
      global.graphicDesign = false;
      global.research = false;
      global.writer = false;
      global.other = false;

      global.description = "";

      this.props.navigation.navigate('Home');

      console.log("Successsfully logged out!");
    }
    catch {
      console.log("Did not successfully logged out :(");
    }
  }

  setSettingModalVisible = (visible) => {
    console.log("fullName: " + this.state.name);
    console.log("phone: " + this.state.phone);
    console.log("description: " + this.state.description);
    this.setState({...Component, settingModalVisible: visible});
  }

  setMatchModalVisible = (visible) => {
    this.setState({...Component, matchModalVisible: visible});
  }

  setNewMatchModalVisible = (visible) => {
    this.setState({...Component, newMatchModalVisible: visible});
  }

  setTempName = async (val) => {
    this.setState({ tempName: val });
  }

  setTempPhone = async (val) => {
    this.setState({ tempPhone: val });
  }

  setTempDescription = async (val) => {
    this.setState({ tempDescription: val });
  }

  setCandEmail = async (val) => {
    this.setState({ candEmail: val });
  }

  setMatchEmail = async (val) => {
    this.setState({ matchEmail: val });
  }

  setMatchDisplay = async (val) => {
    this.setState({ matchDisplay: val });
  }

  setMatchPhone = async (val) => {
    this.setState({ matchPhone: val });
  }

  setCandDisplay = async (val) => {
    this.setState({ candDisplay: val });
  }

  setCandDesc = async (val) => {
    this.setState({ candDesc: val });
  }

  pushMatchesArray = async (val) => {
    // this.setState({ myArray: [this.state.myArray, val] });
    this.setState({ matchesArray: [...this.state.matchesArray, val] });
    // this.setState({ matchesArray: val });
    // this.state.matchesArray.push(val);
  }

  resetMatchesArray = async() => {
    this.setState({matchesArray: []});
  }

  matchesFunctionOpen = async () => {
    this.resetMatchesArray();
    this.setMatchModalVisible(true);
    this.getMatch();
  }

  getProfIndiv = async () => {
    try {

      let sendInfo = {
        email_str: this.state.candEmail,
        access_token_str: global.accessToken,
      }

      let jsonObj = JSON.stringify(sendInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/get_profile_individual', 
      {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.success_bool == true) {
        global.accessToken = res.refreshed_token_str;

        this.setCandDisplay(res.display_name_str);
        this.setCandDesc(res.description_str);

        console.log("Successful GetProfIndiv API");
        console.log("Candidate Display: " + this.state.candDisplay);
        console.log("Candidate Description: " + this.state.candDesc);
      }
      else {
        console.log("Failed at getProfIndiv API");
      }
    }
    catch {
      console.log("Something went wrong with the get_profile_individual API");
    }
  }

  getMatchInfo = async() => {
    try {
      let sendInfo = {
        email_str: this.state.matchEmail,
        access_token_str: global.accessToken,
      }

      let jsonObj = JSON.stringify(sendInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/get_profile_group', 
      {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.success_bool == true) {
        global.accessToken = res.refreshed_token_str;

        this.setMatchDisplay(res.display_name_str);
        this.setMatchPhone(res.phone_str);

        console.log("Successful GetProfIndiv API");
        console.log("Match Name: " + this.state.matchDisplay);
        console.log("Match Email: " + this.state.matchEmail);
        console.log("Match Phone: " + this.state.matchPhone);
      }
      else {
        console.log("Failed at getProfIndiv API");
      }
    }
    catch {
      console.log("Something went wrong with the get_profile_individual API");
    }
  }

  getProfGroup = async () => {
    try {

      let sendInfo = {
        email_str: this.state.candEmail,
        access_token_str: global.accessToken,
      }

      let jsonObj = JSON.stringify(sendInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/get_profile_group', 
      {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.success_bool == true) {
        global.accessToken = res.refreshed_token_str;

        this.setCandDisplay(res.display_name_str);
        this.setCandDesc(res.description_str);

        console.log("Successful GetProfIndiv API");
        console.log("Candidate Display: " + this.state.candDisplay);
        console.log("Candidate Description: " + this.state.candDesc);
      }
      else {
        console.log("Failed at getProfIndiv API");
      }
    }
    catch {
      console.log("Something went wrong with the get_profile_individual API");
    }
  }

  setSwipePerm = async (val) => {
    this.setState({ swipePerm: val });
  }

  handleYup () {
    if (this.state.swipePerm)
      this.acceptFunction();

    console.log("swipePerm: " + this.state.swipePerm);
  }

  handleNope () {
    if (this.state.swipePerm)
      this.rejectFunction();

    console.log("swipePerm: " + this.state.swipePerm);
  }

  // FIXME: ASK PEYTON IF THE CANDIDATE API IS GETTING A NEW CANDIDATE SINCE I'M JUST
  // GETTIN THE SAME ONE
  getCand = async() => {
    try {
      let sendInfo = {
        email_str: global.email.trim(),
        is_group_bool: global.group,
        access_token_str: global.accessToken,
      }

      let jsonObj = JSON.stringify(sendInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/get_candidate', 
      {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());
      
      if (res.success_bool == true) {
        global.accessToken = res.refreshed_token_str;
        
        this.setCandEmail(res.email_str);

        console.log("Candidate email successfully retrived");
        console.log("Candidate email: " + this.state.candEmail);

        
        console.log("group bool: " + global.group);
        if (global.group == true) {
          this.getProfIndiv();
          console.log("Got the individual's info!");
        }
        else {
          this.getProfGroup();
          console.log("Got the group info!");
        }
      }
      else {
        console.log("No candidates left");
        this.setCandDisplay("Sorry, there are no new candidates left to swipe on");
        this.setCandDesc("");
        this.setSwipePerm(false);
      }
    }
    catch {
      console.log("something went wrong with the get_candidate API");
    }
  }

  getMatch = async() => {
    try {
      let sendInfo = {
        email_str: global.email.trim(),
        output_select_str: 'e',
        access_token_str: global.accessToken,
      }

      let jsonObj = JSON.stringify(sendInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/get_matches', 
      {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());

      console.log("parsed JSON");

      global.accessToken = res.refreshed_token_str;
      console.log("getMatch: " + res.matches_array.length);

      for (let i = 0; i < res.matches_array.length; i++)
      {
        let tempObj = new Object;
        tempObj.title = res.matches_array[i].display_name_str;
        tempObj.email = res.matches_array[i].email_str;
        tempObj.phone = res.matches_array[i].phone_str;

        this.pushMatchesArray(tempObj);
      }

      console.log("Successfully got matches");
    }
    catch{
      console.log("There was a problem using the get_matches API");
    }
  }

  handleClick = async() => {
    try {
      if (this.state.tempName.localeCompare("") != 0)
        global.fullName = this.state.tempName.trim();
      if (this.state.tempPhone.localeCompare("") != 0)
        global.phone = this.state.tempPhone.trim();
      if (this.state.tempDescription.localeCompare("") != 0)
        global.description = this.state.tempDescription.trim();

      console.log("fullname is: " + global.fullName);
      console.log("phone is: " + global.phone);
      console.log("description is: " + global.description);

      let updateInfo = {
        email_str: global.email.trim(),
        update_fields_obj: {
          display_name_str: global.fullName,
          phone_str: global.phone,
          description_str: global.description,
        },
        access_token_str: global.accessToken, 
      }

      let jsonObj = JSON.stringify(updateInfo);

      const response = await fetch('https://kindling-lp.herokuapp.com/api/update_profile', 
        {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.success_bool == true) {
        global.accessToken = res.refreshed_token_str;

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
      console.log("Something went wrong with the update_profile API");
    }
  }

  rejectFunction = async() => {
    console.log("swipePerm: " + this.state.swipePerm);
    if (this.state.swipePerm)
    {
      try{
        let sendInfo = {
          email_str: global.email.trim(),
          // is_group_bool: global.group,
          target_email_str: this.state.candEmail,
          access_token_str: global.accessToken,
        }

        let jsonObj = JSON.stringify(sendInfo);

        const response = await fetch('https://kindling-lp.herokuapp.com/api/swipe_left', 
        {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

        var res = JSON.parse(await response.text());

        if (res.success_bool == true) {
          global.accessToken = res.refreshed_token_str;
          console.log("Successfully rejected, about to get new candidate!");
          this.getCand();
        }
        else {
          console.log("Rejecting was a failure");
        }
      }
      catch {
        console.log("Something went wrong with the swipe_left API");
      }
    }
  }

  acceptFunction = async() => {
    console.log("swipePerm: " + this.state.swipePerm);
    if (this.state.swipePerm)
    {
      // Set and store the match info
      this.setMatchEmail(this.state.candEmail);

      try{
        let sendInfo = {
          email_str: global.email.trim(),
          // is_group_bool: global.group,
          target_email_str: this.state.candEmail,
          access_token_str: global.accessToken,
        }

        let jsonObj = JSON.stringify(sendInfo);

        const response = await fetch('https://kindling-lp.herokuapp.com/api/swipe_right', 
        {method:'POST', body:jsonObj, headers:{'Content-Type':'application/json'}});

        var res = JSON.parse(await response.text());

        if (res.success_bool == true) {
          global.accessToken = res.refreshed_token_str;

          console.log("Successfully accepted");
          // Check to see if we need to display new match screen
          console.log("Value of match_bool: " + res.match_bool);
          if (res.match_bool == true) {
            this.getMatchInfo();
            this.setNewMatchModalVisible(true);
          }

          this.getCand();
        }
        else {
          console.log("Accepting was a failure");
        }
      }
      catch {
        console.log("Something went wrong with the swipe_right API");
      }
    }
  }

  componentDidMount(){
    this.getCand();
  }

  render() {
    const { settingModalVisible, matchModalVisible,  newMatchModalVisible } = this.state;
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.row}>

            <Pressable style={styles.person} onPress={() => this.setSettingModalVisible(true)}>
              <Image source={person}></Image>
            </Pressable>

            <Image source={logo} style={styles.logo}></Image>

            <Pressable style={styles.menu} onPress={() => this.matchesFunctionOpen()}>
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

                {/* FIXME: CHECK WITH KIERSTEN IF WE CAN JUST USE THE GLOBAL VARIABLES FOR THE PLACEHOLDER OR WE NEED TO USE THE STATES*/}
                <View style={styles.modalContent}>
                  <Text style={styles.modalHeader}>Name</Text>
                  <TextInput style={styles.modalInput} placeholder={/* this.state.name */ global.fullName} onChangeText={(val) => {this.setTempName(val)}}></TextInput>
                  <Text style={styles.modalHeader}>Phone Number</Text>
                  <TextInput style={styles.modalInput} placeholder={/* this.state.phone */ global.phone} keyboardType={"number-pad"} onChangeText={(val) => {this.setTempPhone(val)}}></TextInput>
                  <Text style={styles.modalHeader}>Description</Text>
                  <TextInput style={styles.modalDescription} placeholder={/* this.state.description */ global.description} multiline={true} onSubmitEditing={Keyboard.dismiss} onChangeText={(val) => {this.setTempDescription(val)}}></TextInput>

                  <View style={styles.buttonModal}>
                    <Pressable style={styles.button}>
                      <Text style={styles.buttonText} onPress={this.logOutFunction}>Log Out</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                      <Text style={styles.buttonText} onPress={this.handleClick}>Save Changes</Text>
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
                  data={this.state.matchesArray}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.email}
                />
              </View>
            </View>
          </Modal>

          <Modal visible={newMatchModalVisible}>
            <ImageBackground source={background} style={styles.background}>
              <View style={styles.newMatch}>
                <Text style={styles.newMatchTitle}>It's a match!</Text>
                <Image source={bigLogo} style={styles.matchLogo}/>
                <Text style={styles.newMatchSubTitle}>{this.state.matchDisplay}'s contact info:</Text>
                <Text style={styles.newMatchInfo}>{this.state.matchEmail}</Text>
                <Text style={styles.newMatchInfo}>{this.state.matchPhone}</Text>
                <Pressable onPress={() => this.setNewMatchModalVisible(false)} style={styles.button}>
                  <Text style={styles.buttonText}>Keep Swiping</Text>
                </Pressable>
              </View>
            </ImageBackground>
          </Modal>

          <SwipeCards
            cards={this.state.candArray}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderCard}
            handleYup={this.handleYup}
            handleNope={this.rejectFunction}
            hasMaybeAction
            loop={this.state.swipePerm}
            onClickHandler={() => {console.log("")}}
          />

          <View style={styles.buttonRow}>
            <Pressable style={styles.rejectButton} onPress={() => this.rejectFunction()}>
              <Image source={reject}></Image>
            </Pressable>
            <Pressable style={styles.acceptButton} onPress={() => this.acceptFunction()}>
              <Image source={accept}></Image>
            </Pressable>
          </View>
        </ImageBackground>
        <StatusBar barStyle="light-content" backgroundColor="white"/>
      </View>
    )
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
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: '#BF4342',
    height: 45,
    width: 150,
    borderRadius: 14,

    shadowColor: '#CB1809', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    elevation: 2, // Android
  },
  buttonModal: {
    justifyContent: "center", 
    alignItems: "center", 
    flexDirection: 'row',
    justifyContent: "space-between",
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
    // width: "85%", 
    width: 350,
    // height: "65%",
    height: 500, 
    marginTop: "10%",
    borderRadius: 10,
    padding: 10,
    borderColor: "white",
    borderWidth: 1,
  },
  flatListStyle: {
    height: "87%",
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
    justifyContent: "space-between",
    marginTop: 20,
    marginRight: 10,
  },
  rejectButton: {
    marginRight: "45%",
  },
  acceptButton: {
    marginTop: 15,
  },
  newMatch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchLogo: {
    marginTop: 40,
    marginBottom: 55,
  },
  newMatchTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  newMatchSubTitle: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
  newMatchInfo: {
    color: "white",
    fontSize: 18,
    paddingTop: 15,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});