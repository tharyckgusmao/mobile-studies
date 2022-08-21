import {Skia} from '@shopify/react-native-skia';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View
} from 'react-native';
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';
import {processTransform3d} from 'react-native-redash';
import Back from '../../assets/back.jpg';
import Front from '../../assets/book.jpg';
const {height, width} = Dimensions.get('window');
type Props = {};
/**
 * @worklet
 */
export const toMatrix3 = m => {
  'worklet';
  return [m[0], m[4], m[12], m[1], m[5], m[13], m[3], m[7], m[15]];
};

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const BookGallery = (props: Props) => {
  //   const [toggle, setToggled] = useState(false);
  //   const x = useValue(0);
  //   const progress = useSharedValue(0);
  const opacity = useSharedValue(0);

  //   useEffect(() => {
  //     progress.value = ing(toggle ? 1 : 0, {
  //       duration: 600,
  //       easing: Easing.quad
  //     });
  //   }, [toggle]);

  //   useSharedValueEffect(() => {
  //     x.current = progress.value;
  //   }, progress);

  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 10
  });

  useEffect(() => {
    opacity.value = withDelay(300, withTiming(0.8, {duration: 1000}));
  });

  const opacityAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  const transformXY = useAnimatedStyle(() => {
    const rotateX = animatedSensor.sensor.value.qx;
    const rotateZ = animatedSensor.sensor.value.pitch;
    return {
      transform: [
        {
          rotateX: `${rotateZ * 30}deg`
        },
        {
          rotateY: `${rotateX * 50}deg`
        },
        {perspective: 360}
      ]
    };
  }, []);

  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#16191e',
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center'
        // ...StyleSheet.absoluteFill
      }}>
      <AnimatedImageBackground
        source={Back}
        style={[StyleSheet.absoluteFill, opacityAnimated]}
        resizeMode="cover"
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Animated.View
          style={[
            {
              width: 200,
              height: 300,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 11
              },
              shadowOpacity: 0.57,
              shadowRadius: 15.19,

              elevation: 23,
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 6
            },
            transformXY
          ]}>
          <Image
            source={Front}
            style={{
              width: '100%',
              height: '100%'
            }}
            resizeMethod="scale"
          />
          <View
            style={{
              width: '96%',
              height: '96%',
              position: 'absolute',
              left: '2%',
              top: '2%',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 4
            }}
          />
        </Animated.View>
      </View>
      {/* <View>
        <Canvas style={{width, height: 40}}>
          <Path
            path="M1 15.5H204M204 15.5L190 1.5M204 15.5L190 29.5"
            strokeJoin="round"
            strokeWidth={2}
            start={0}
            end={x}
            color="#d9d9d9"
            style="stroke"
          />
        </Canvas>
        <Button
          title="Move it"
          onPress={() => {
            setToggled(p => !p);
          }}
        />
      </View> */}
    </View>
  );
};

export default BookGallery;
