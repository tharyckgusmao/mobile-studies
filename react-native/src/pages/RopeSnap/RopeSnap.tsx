// import {
//   Canvas,
//   interpolatePaths,
//   Path,
//   Skia,
//   useDerivedValue,
//   useSharedValueEffect,
//   useValue
// } from '@shopify/react-native-skia';
import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import {
  addCurve,
  clamp,
  createPath,
  mixColor,
  serialize,
  snapPoint
} from 'react-native-redash';
import Svg, {Path} from 'react-native-svg';
import PlugFImage from '../../assets/plugf.png';
import PlugMImage from '../../assets/plugm.png';
const {height, width} = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);

type Props = {};

const CIRCLE_RADIUS = 32;
const CIRCLE_MAX_ROPE = 200;
const CENTER_CIRCLE = CIRCLE_RADIUS / 2;
const RopeSnap = (props: Props) => {
  const [render, setRender] = useState(false);
  const [points, setPoints] = useState(null);
  const x1 = useSharedValue(0);
  const y1 = useSharedValue(0);
  const x2 = useSharedValue(CIRCLE_MAX_ROPE);
  const y2 = useSharedValue(0);
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const colorPlug = useSharedValue(1);

  const xSPring = useSharedValue(0);
  const x2SPring = useSharedValue(0);
  const ySPring = useSharedValue(CENTER_CIRCLE);
  const y2SPring = useSharedValue(CENTER_CIRCLE);

  // const skValue = useValue(0);
  // const skValueShared = useSharedValue(0);

  // const path = Skia.Path.Make();
  // path.moveTo(CENTER_CIRCLE, CENTER_CIRCLE);
  // path.lineTo(CENTER_CIRCLE, CENTER_CIRCLE);
  // path.lineTo(CIRCLE_MAX_ROPE / 2, CENTER_CIRCLE);
  // path.lineTo(CIRCLE_MAX_ROPE + CENTER_CIRCLE, CENTER_CIRCLE);
  // path.close();

  const gestureHandler1 = useAnimatedGestureHandler(
    {
      onStart: (_, ctx) => {
        ctx.startX = x1.value;
        ctx.startY = y1.value;
        scale1.value = withSpring(1.1);
        colorPlug.value = withTiming(0, {
          duration: 300
        });
      },
      onActive: (event, ctx) => {
        x1.value = clamp(
          ctx.startX + event.translationX,
          x2.value - CIRCLE_MAX_ROPE,
          x2.value + CIRCLE_MAX_ROPE
        );
        y1.value = clamp(
          ctx.startY + event.translationY,
          y2.value - CIRCLE_MAX_ROPE,
          y2.value + CIRCLE_MAX_ROPE
        );
        xSPring.value = withSpring(x1.value + CENTER_CIRCLE);
        x2SPring.value = withSpring(x2.value + CENTER_CIRCLE);

        let clampMaxX = clamp(
          Math.abs(x2.value - x1.value),
          Math.abs(x2.value - x1.value),
          CIRCLE_MAX_ROPE
        );
        let clampMaxY = clamp(
          Math.abs(y2.value - y1.value),
          Math.abs(y2.value - y1.value),
          CIRCLE_MAX_ROPE
        );

        let maxRopeMoment = Math.max(clampMaxX, clampMaxY);
        let factorMax = clamp(
          Math.abs((maxRopeMoment / CIRCLE_MAX_ROPE - 1) * 25),
          1,
          7
        );

        ySPring.value = withSpring(y1.value + CENTER_CIRCLE * factorMax);
        y2SPring.value = withSpring(y2.value + CENTER_CIRCLE * factorMax);
      },
      onEnd: _ => {
        scale1.value = withSpring(1);
        if (points) {
          y1.value = snapPoint(y1.value, 0.1, points.y1);
          x1.value = snapPoint(x1.value, 0.1, points.x1);
          colorPlug.value = withTiming(1, {
            duration: 300
          });
        }
      }
    },
    [render]
  );
  const gestureHandler2 = useAnimatedGestureHandler(
    {
      onStart: (_, ctx) => {
        ctx.startX = x2.value;
        ctx.startY = y2.value;
        scale2.value = withSpring(1.1);
        colorPlug.value = withTiming(0, {
          duration: 300
        });
      },
      onActive: (event, ctx) => {
        x2.value = clamp(
          ctx.startX + event.translationX,
          x1.value - CIRCLE_MAX_ROPE,
          x1.value + CIRCLE_MAX_ROPE
        );
        y2.value = clamp(
          ctx.startY + event.translationY,
          y1.value - CIRCLE_MAX_ROPE,
          y1.value + CIRCLE_MAX_ROPE
        );
        xSPring.value = withSpring(x1.value + CENTER_CIRCLE);
        x2SPring.value = withSpring(x2.value + CENTER_CIRCLE);

        let clampMaxX = clamp(
          Math.abs(x2.value - x1.value),
          Math.abs(x2.value - x1.value),
          CIRCLE_MAX_ROPE
        );
        let clampMaxY = clamp(
          Math.abs(y2.value - y1.value),
          Math.abs(y2.value - y1.value),
          CIRCLE_MAX_ROPE
        );

        let maxRopeMoment = Math.max(clampMaxX, clampMaxY);
        let factorMax = clamp(
          Math.abs((maxRopeMoment / CIRCLE_MAX_ROPE - 1) * 25),
          1,
          7
        );

        ySPring.value = withSpring(y1.value + CENTER_CIRCLE * factorMax);
        y2SPring.value = withSpring(y2.value + CENTER_CIRCLE * factorMax);
      },
      onEnd: _ => {
        scale2.value = withSpring(1);
        if (points) {
          y2.value = snapPoint(y2.value, 0.1, points.y2);
          x2.value = snapPoint(x2.value, 0.1, points.x2);
        }
        colorPlug.value = withTiming(1, {
          duration: 300
        });
        // x1.value = withSpring(0);
        // y1.value = withSpring(0);
      }
    },
    [render]
  );

  const animatedXY1Props = useAnimatedProps(() => {
    return {
      left: x1.value,
      top: y1.value,
      transform: [{scale: scale1.value}]
    };
  });
  const animatedXY2Props = useAnimatedProps(() => {
    return {
      left: x2.value,
      top: y2.value,
      transform: [{scale: scale2.value}]
    };
  });

  // useSharedValueEffect(() => {
  //   skValue.current = skValueShared.value;
  // }, skValueShared);

  // const animatedPath = useDerivedValue(() => {
  //   const newPosition = Skia.Path.Make();

  //   console.log(y1.value);
  //   console.log(x1.value);
  //   newPosition.moveTo(x1.value, 20);
  //   newPosition.lineTo(CENTER_CIRCLE, 20);
  //   // newPosition.lineTo(x1.value + CIRCLE_MAX_ROPE / 2, CENTER_CIRCLE);
  //   // newPosition.lineTo(x2.value, y2.value);
  //   // newPosition.close();
  //   return interpolatePaths(skValue.current, [0, 1], [path, newPosition]);
  // }, [skValue]);

  const pugStokeColor = useDerivedValue(() =>
    interpolateColor(
      colorPlug.value,
      [0, 1],
      ['rgb(106,106,106)', 'rgb(29,83,108)'],
      'RGB'
    )
  );
  const animatedProps = useAnimatedProps(() => {
    const p1 = {x: x1.value + CENTER_CIRCLE, y: y1.value + CENTER_CIRCLE};
    const p4 = {x: x2.value + CENTER_CIRCLE, y: y2.value + CENTER_CIRCLE};

    const path = createPath(p1);
    addCurve(path, {
      c1: {x: xSPring.value, y: ySPring.value},
      c2: {x: x2SPring.value, y: y2SPring.value},
      to: p4
    });

    return {
      d: serialize(path),
      stroke: pugStokeColor.value
    };
  });
  const animatedShadowProps = useAnimatedProps(() => {
    const p1 = {x: x1.value + CENTER_CIRCLE, y: y1.value + 10 + CENTER_CIRCLE};
    const p4 = {x: x2.value + CENTER_CIRCLE, y: y2.value + 10 + CENTER_CIRCLE};

    const pathShadow = createPath(p1);
    addCurve(pathShadow, {
      c1: {x: xSPring.value, y: ySPring.value + 12},
      c2: {x: x2SPring.value, y: y2SPring.value + 12},
      to: p4
    });

    return {d: serialize(pathShadow)};
  });

  const mensureInititalPosition = ev => {
    const PADDING = 20;
    var {x, y} = ev.nativeEvent.layout;
    let xFactor = x + PADDING;
    let yFactor = y + PADDING;

    x1.value = xFactor - 3;
    y1.value = yFactor;

    let x2Factor = x * 3 + CIRCLE_RADIUS * 2 - CENTER_CIRCLE;
    let y2Factor = y + PADDING;
    x2.value = x2Factor + 3;
    y2.value = y2Factor;
    setTimeout(() => {
      calculateSpringBezier();
    }, 200);
    const points = {
      x1: new Array(3).fill(0).map((e, k) => {
        return xFactor * (k + 1);
      }),
      y1: new Array(3).fill(0).map((e, k) => {
        return yFactor + (k != 0 ? k * (8 + CIRCLE_RADIUS) : 0);
      }),
      x2: new Array(3).fill(0).map((e, k) => {
        return x2Factor * (k + 1);
      }),
      y2: new Array(3).fill(0).map((e, k) => {
        return yFactor + (k != 0 ? k * (8 + CIRCLE_RADIUS) : 0);
      })
    };
    setPoints(points);
    setRender(true);
  };
  const calculateSpringBezier = () => {
    xSPring.value = withSpring(x1.value + CENTER_CIRCLE);
    x2SPring.value = withSpring(x2.value + CENTER_CIRCLE);

    let clampMaxX = clamp(
      Math.abs(x2.value - x1.value),
      Math.abs(x2.value - x1.value),
      CIRCLE_MAX_ROPE
    );
    let clampMaxY = clamp(
      Math.abs(y2.value - y1.value),
      Math.abs(y2.value - y1.value),
      CIRCLE_MAX_ROPE
    );

    let maxRopeMoment = Math.max(clampMaxX, clampMaxY);
    let factorMax = clamp(
      Math.abs((maxRopeMoment / CIRCLE_MAX_ROPE - 1) * 25),
      1,
      7
    );

    ySPring.value = withSpring(y1.value + CENTER_CIRCLE * factorMax);
    y2SPring.value = withSpring(y2.value + CENTER_CIRCLE * factorMax);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: '#141e2e'
      }}>
      <View
        style={{
          margin: 40,
          padding: 20,
          backgroundColor: '#dddddd',
          height: 200,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5
        }}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Image
              style={styles.plugf}
              source={PlugFImage}
              onLayout={event => {
                mensureInititalPosition(event);
              }}
            />
            <Image style={styles.plugf} source={PlugFImage} />
            <Image style={styles.plugf} source={PlugFImage} />
          </View>
          <View style={styles.col}>
            <Image style={styles.plugf} source={PlugFImage} />
            <Image style={styles.plugf} source={PlugFImage} />
            <Image style={styles.plugf} source={PlugFImage} />
          </View>
        </View>

        {render && (
          <>
            <PanGestureHandler onGestureEvent={gestureHandler1} maxPointers={1}>
              <Animated.View style={[styles.circle, animatedXY1Props]}>
                <Image style={styles.plugm} source={PlugMImage} />
              </Animated.View>
            </PanGestureHandler>
            <PanGestureHandler onGestureEvent={gestureHandler2} maxPointers={1}>
              <Animated.View
                style={[
                  styles.circle,
                  {left: CIRCLE_MAX_ROPE},
                  animatedXY2Props
                ]}>
                <Image style={styles.plugm} source={PlugMImage} />
              </Animated.View>
            </PanGestureHandler>
            <Svg
              width={width}
              height={height}
              style={[StyleSheet.absoluteFill]}
              pointerEvents={'none'}>
              <AnimatedPath
                stroke="#6A6A6A08"
                strokeWidth="6"
                animatedProps={animatedShadowProps}
              />
              <AnimatedPath
                strokeWidth="6"
                strokeLinecap="round"
                animatedProps={animatedProps}
              />
            </Svg>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_RADIUS,
    height: CIRCLE_RADIUS,
    borderRadius: CIRCLE_RADIUS,

    position: 'absolute',
    left: 0,
    top: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13
  },
  row: {
    flexDirection: 'row'
  },
  col: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },
  plugf: {
    marginBottom: 10,
    width: 30,
    height: 30
  },
  plugm: {
    width: '100%',
    height: '100%'
  }
});

export default RopeSnap;
