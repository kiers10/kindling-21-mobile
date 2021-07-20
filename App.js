import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import homeScreen from './screens/homescreen';
import loginScreen from './screens/loginscreen';
import registerScreen from './screens/registerscreen';
import infoScreen from './screens/infoscreen'
import verifyScreen from './screens/verifyscreen';
import descriptionScreen from './screens/description';
import mainScreen from './screens/mainscreen';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({  
  Home: {    
    screen: homeScreen,
    navigationOptions: {
      // headerShown: false,
      title: "",
      headerTransparent: true,
      headerTintColor: "white",
    }
  },
  Login: {    
    screen: loginScreen,
    navigationOptions: {
      // headerShown: false,
      title: "",
      headerTransparent: true,
      headerTintColor: "white",
    }
  },
  SignUp: {    
    screen: registerScreen,
    navigationOptions: {
      title: "",
      headerTransparent: true,
      headerTintColor: "white",
    }
  },
  VerifyCode: {
    screen: verifyScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  Info: {
    screen: infoScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  Description: {
    screen: descriptionScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  MainScreen: {
    screen: mainScreen,
    navigationOptions: {
      headerShown: false,
    }
  }
},
{  
  initialRouteName: "Home"
}
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
