import React, {useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View, Image} from 'react-native';
import Animated, {
  runOnJS,
  SensorType,
  useAnimatedProps,
  useAnimatedSensor
} from 'react-native-reanimated';
import Images from './images';
import FastImage from 'react-native-fast-image';
const {height, width} = Dimensions.get('window');
const Rotate360 = () => {
  const [imageActive, setImageActive] = useState(
    Images[Math.floor(Images.length / 2)]
  );
  const changeImage = index => {
    setImageActive(index);
  };
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 400
  });
  const animatedProps = useAnimatedProps(() => {
    let index = Math.floor(
      ((animatedSensor.sensor.value.qx * 360) / Images.length) * 10 + 24
    );
    console.log(index);

    if (index <= 0) {
      index = 0;
    } else if (index >= Images.length - 1) {
      index = Images.length - 1;
    }

    runOnJS(changeImage)(Images[index]);
    return {
      source: Images[index]
    };
  });

  const Image = useMemo(() => {
    return (
      <FastImage
        source={imageActive}
        style={{
          width: width - 20,
          height: 600
        }}
        resizeMode="contain"
      />
    );
  }, [imageActive]);
  return (
    <View
      style={[
        styles.flex,
        styles.colC,
        styles.rowC,
        {padding: 20, backgroundColor: '#3d3d3d'}
      ]}>
      {Image}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  rowC: {
    alignContent: 'center'
  },
  colC: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  flex: {
    flex: 1
  }
});
export default Rotate360;
