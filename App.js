import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import styled from "styled-components";

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

import Prediction from "./Prediction";

export default function App () {
  const [isTfReady, setIsTfReady] = useState(false);
  const [image, setImage] = useState("https://i.pinimg.com/originals/96/05/ac/9605acd450ff7cf944d948752d3020ac.jpg");

  const pickImage = async () => {
    const {status_roll} = await Permissions.askAsync(Permissions.CAMERA_ROLL); 
    let result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true, 
      aspect: [4, 3], 
    }); 
    if (!result.cancelled) { 
      setImage(result.uri);
    }
  };

  useEffect(()=> {
    const setTfJs = async () => {
      await tf.ready();
      setIsTfReady(true);
    }
    setTfJs();
  }, [])

  return (
    <View style={styles.container}>
      <Title>어떤 사진인지 맞춰볼께요!</Title>
      <View>
        <Image source={{uri: image}} style={styles.img}/>
        <View>
          <Button style={styles.button} title="이미지선택" onPress={() => pickImage()}/>
        </View>
      </View>
      <Prediction img={image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 250,
    height: 250,
  },
  button: {
    borderStyle: "solid",
    borderColor: "#F07C84",
    color: "#F07C84",
    borderRadius: 8,
    marginBottom: 20
  }
});

const Title = styled.Text`
  font-size: 30px;
  padding-bottom: 15px;
  color: blue;
`