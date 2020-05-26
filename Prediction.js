import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
// import { useStopwatch } from 'react-timer-hook';

import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import Loading from "./Loading";

const Prediction = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const { img } = props;
  // const { minutes, seconds, start, pause, reset } = useStopwatch({ autoStart: true });

  const predict = async () => {
    const model = await mobilenet.load();
    const response = await fetch(img, {}, { isBinary: true });
    const imageData = await response.arrayBuffer();
    const uintArray = new Uint8Array(imageData)
    const imageTensor = decodeJpeg(uintArray, 3);
    const prediction = await model.classify(imageTensor);
    setPredictions(prediction);
    setIsLoading(true);
  }
  // useEffect(() => {
  //   if (isLoading) {
  //     pause();
  //     reset();
  //   } else {
  //     start();
  //   }
  // }, [isLoading])

  useEffect(() => {
    setIsLoading(false);
    predict();
  }, [props.img])

  return (
    <View>
      {isLoading ? 
        <View>
          <Text>1.</Text>
          <Text>{predictions[0].className}</Text>
          <Text>{predictions[0].probability * 100}%정도 확률</Text>
          <Text>2.</Text>
          <Text>{predictions[1].className}</Text>
          <Text>{predictions[1].probability * 100}%정도 확률</Text>
        </View> : 
        <View>
          <Loading />
          {/* <Text>{minutes}분 {seconds}초 지남</Text> */}
        </View>
      }
    </View>
  )
}

export default Prediction;