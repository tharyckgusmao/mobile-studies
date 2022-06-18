import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {clamp, ReText} from 'react-native-redash';
import ROULLETE from '../../assets/ROULLETE.png';
import {height, width} from '../../utils/utils/constants';
const {PI, cos, sin} = Math;
export const center = {x: width / 2, y: height / 2};
export const RADIUS = width * 0.4;
const SIZE = RADIUS * 2;
const centerO = SIZE / 2 - 15;

let pro = new Array(8)
  .fill(0)
  .map((e, k) => {
    return new Array(12).fill(0).map((ee, kk) => {
      return k;
    });
  })
  .flat();

let data = new Array(8).fill(0).map((e, k) => {
  return {
    angle: [(k * (2 * PI)) / 8, ((k + 1) * (2 * PI)) / 8],
    pos: k,
  };
});

function probrability() {
  'worklet';
  return data[pro[(Math.random() * 100).toFixed()]];
}

export default function Roullete() {
  const theta = useSharedValue(0);
  const scale = useSharedValue(1);
  const animating = useSharedValue(0);
  const x = useSharedValue(centerO);
  const y = useSharedValue(centerO);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offset = 0;
      if (ctx.state === 0) {
        scale.value = withTiming(1.03, {
          duration: 200,
          easing: Easing.ease,
        });
      }
    },
    onActive: (value, ctx) => {
      if (animating.value === 0) {
        var angle = Math.atan2(
          center.y - value.absoluteY,
          center.x - value.absoluteX,
        );

        ctx.state = 1;
        if ((angle < 0 && angle >= -4) || (angle <= 4 && angle >= 1.5)) {
          theta.value = angle;
          ctx.state = 2;
        } else {
          ctx.state = 0;
          theta.value = withSpring(0);
          scale.value = withTiming(1, {
            duration: 500,
            easing: Easing.ease,
          });
        }

        x.value = value.absoluteX - center.x + centerO;
        y.value = value.absoluteY - center.y + centerO;
      }
    },
    onEnd: (value, ctx) => {
      if (ctx.state == 0) {
        scale.value = withTiming(1, {
          duration: 200,
          easing: Easing.ease,
        });
      } else {
        animating.value = 1;
        let factor = Math.abs(value.velocityY) > 1000;
        let pro = probrability();

        let basePI = factor ? 20 * PI : 8 * PI;

        let basePIPost =
          pro.angle[0] + (pro.angle[1] - pro.angle[0]) / 2 - PI / 2;
        console.log(pro);

        theta.value = withTiming(
          basePI + basePIPost,
          {
            duration: factor ? 3000 : 4000,
            easing: Easing.bezier(0, 0.76, 0.5, 1.04),
          },
          () => {
            animating.value = 0;
            scale.value = withTiming(1, {
              duration: 200,
              easing: Easing.ease,
            });
          },
        );
      }
    },
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      transform: [
        {rotate: `${theta.value}rad`},
        {
          scale: scale.value,
        },
      ],
    };
  });
  const animatedXYProps = useAnimatedProps(() => {
    return {
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });
  const animatedXProps = useAnimatedProps(() => {
    return {
      height: 2,
      width: x.value,
      transform: [
        {
          translateY: y.value + 15,
        },
      ],
    };
  });
  const animatedYProps = useAnimatedProps(() => {
    return {
      width: 2,
      height: y.value,
      transform: [
        {
          translateX: x.value + 15,
        },
      ],
    };
  });
  const animatedIntersectionProps = useAnimatedProps(() => {
    let height = y.value - centerO;
    let width = x.value - centerO;

    let factorY = y.value > centerO ? -height : 0;
    let factorX = x.value > centerO ? 0 : width;
    return {
      width: Math.abs(width),
      height: Math.abs(height),
      borderTopWidth: y.value < centerO ? 2 : 0,
      borderBottomWidth: y.value > centerO ? 2 : 0,
      borderLeftWidth: x.value < centerO ? 2 : 0,
      borderRightWidth: x.value > centerO ? 2 : 0,
      transform: [
        {
          translateX: factorX + centerO + 15,
        },
        {
          translateY: factorY + y.value + 15,
        },
      ],
    };
  });

  const xCoord = useDerivedValue(
    () =>
      `(${(x.value - centerO).toFixed(0)},${(y.value - centerO).toFixed(0)})`,
  );

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
      }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.Image
          source={ROULLETE}
          style={[
            {
              width: SIZE,
              height: SIZE,
              borderRadius: RADIUS,
              overflow: 'hidden',
              resizeMode: 'cover',
            },
            animatedProps,
          ]}
        />
      </PanGestureHandler>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          backgroundColor: '#52f9ff1f',
          width: SIZE,
          height: SIZE,
          borderRadius: RADIUS,
          overflow: 'hidden',
        }}>
        <View
          style={{
            position: 'absolute',
            width: SIZE,
            height: 2,
            backgroundColor: '#ff0000',
            transform: [
              {
                translateY: SIZE / 2,
              },
            ],
          }}></View>
        <View
          style={{
            position: 'absolute',
            width: 2,
            height: SIZE,
            backgroundColor: '#ff0000',
            transform: [
              {
                translateX: SIZE / 2,
              },
            ],
          }}></View>

        {/* <Animated.View
          style={[
            {
              width: 0,
              height: 0,
              position: 'absolute',
              backgroundColor: '#9fd9ff',
              color: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            },
            animatedXProps,
          ]}></Animated.View>
        <Animated.View
          style={[
            {
              width: 0,
              height: 0,
              position: 'absolute',
              backgroundColor: '#9fd9ff',
              color: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            },
            animatedYProps,
          ]}></Animated.View> */}

        <Animated.View
          style={[
            {
              width: 0,
              height: 0,
              position: 'absolute',
              backgroundColor: '#2f99f040',
              color: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopWidth: 2,
              borderRightWidth: 2,
              borderLeftWidth: 2,
              borderBottomWidth: 2,
              borderColor: '#95d5ff',
              borderStyle: 'dashed',
            },
            animatedIntersectionProps,
          ]}></Animated.View>

        <Animated.View
          style={[
            {
              width: 30,
              height: 30,
              position: 'absolute',
              backgroundColor: '#49b6ff',
              color: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            },
            animatedXYProps,
          ]}></Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              color: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            },
            animatedXYProps,
          ]}>
          <ReText
            text={xCoord}
            style={{
              color: '#ffffff',
            }}></ReText>
        </Animated.View>
      </View>
      {/* <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              width: 50,
              height: 50,
              backgroundColor: 'red',
            },
            animatedStyle,
          ]}
        />
      </PanGestureHandler> */}
    </View>
  );
}

const styles = StyleSheet.create({});
