import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class ProfilePicture extends Component{
  constructor(props) {
      super(props);
      this.state = {
        image: "https://thumbs.dreamstime.com/b/school-science-radiation-atom-books-bacteria-miscroscope-vector-illustration-design-144774102.jpg",
      };
  }
 
  render() {
    return (
      <View style={styles.container}>
          {
            <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />
          }
              
          <View style={styles.uploadBtnContainer}>
              <TouchableOpacity onPress={this.addImage} style={styles.uploadBtn} >
                  <Text style={styles.upload}>{this.state.image ? 'Edit' : 'Upload'} Image</Text>
              </TouchableOpacity>
          </View>
      </View>
     
    );
  }

  setImage = async(val) => {
    this.setState({ image: val });
  }

  addImage = async() => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      this.setImage(_image.uri);
    }
  }
}

const styles = StyleSheet.create({
    container:{
        elevation:2,
        marginTop: 100,
        height: 200,
        width:200, 
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'black',
        width:'100%',
        height:'25%',
    },
    upload: {
      fontSize: 18,
      marginTop: 8,
      color: "white",
      // fontWeight: "bold",
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})