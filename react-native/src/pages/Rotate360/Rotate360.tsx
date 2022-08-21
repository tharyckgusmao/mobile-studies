import React, {useRef, useState} from 'react';
import {Button, Dimensions, StyleSheet, View} from 'react-native';
import {SensorType, useAnimatedSensor} from 'react-native-reanimated';
import SpriteSheet from 'rn-sprite-sheet';
import Images from './images';

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
  // const animatedProps = useAnimatedProps(() => {
  //   let index = Math.floor(
  //     ((animatedSensor.sensor.value.qx * 360) / Images.length) * 10 + 24
  //   );
  //   console.log(index);

  //   if (index <= 0) {
  //     index = 0;
  //   } else if (index >= Images.length - 1) {
  //     index = Images.length - 1;
  //   }

  //   runOnJS(changeImage)(Images[index]);
  //   return {
  //     source: Images[index]
  //   };
  // });

  const anim = useRef(null);

  return (
    <View style={[styles.flex, {padding: 20, backgroundColor: '#3d3d3d'}]}>
      <SpriteSheet
        ref={anim}
        source={require('../../assets/360/spritesheet-min.png')}
        columns={8}
        rows={8}
        height={200} // set either, none, but not both
        width={200}
        // frameHeight={50}
        // frameWidth={50}
        // offsetX={0}
        // offsetY={0}
        animations={{
          rotate: new Array(57).fill(0).map((e, k) => k)
        }}
      />
      <Button
        onPress={() => {
          anim.current.play({
            type: 'rotate',

            loop: true
          });
        }}
        title={'play'}
      />
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
