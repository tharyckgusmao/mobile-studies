import {
  Canvas,
  Fill,
  Circle,
  Shader,
  Line,
  vec,
  useValue,
  useClockValue,
  useComputedValue,
  Path,
  Skia,
  toDegrees,
} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions, View} from 'react-native';

export const {height, width} = Dimensions.get('window');

type Props = {};
const H = 300;
const RADIUS = 120;
const RADIUS_CENTER = 60;
const interval = 3000;
const calcCenter = (value: number, factor: number) => {
  return value + (factor / 2 - value);
};

const SinCos = (props: Props) => {
  const clock = useClockValue();

  const vecPos = useComputedValue(() => {
    const angle = (Math.PI * clock.current) / interval;
    const dx = Math.cos(angle) * RADIUS;
    const dy = Math.sin(angle) * RADIUS;
    return vec(calcCenter(RADIUS, width) + dx, calcCenter(RADIUS, H) + dy);
  }, [clock]);

  const arcPos = useComputedValue(() => {
    let angle = ((Math.PI * clock.current) / interval) % (Math.PI * 2);

    const path = Skia.Path.Make();
    const arcRect = {
      x: calcCenter(RADIUS_CENTER, width) - RADIUS_CENTER / 2,
      y: calcCenter(RADIUS_CENTER, H) - RADIUS_CENTER / 2,
      width: RADIUS_CENTER,
      height: RADIUS_CENTER,
    };
    path.addArc(arcRect, 0, toDegrees(angle));
    return path;
  }, [clock]);

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Canvas style={{width: width, height: H}}>
        <Circle
          cx={calcCenter(RADIUS, width)}
          cy={calcCenter(RADIUS, H)}
          r={RADIUS}
          color="#47d21d"
          strokeWidth={2}
          style="stroke"
        />
        <Line
          p1={vec(calcCenter(2, width), 0)}
          p2={vec(calcCenter(2, width), calcCenter(2, height))}
          color="#c2c2c2"
          strokeWidth={2}
          style="stroke"
        />
        <Line
          p1={vec(0, calcCenter(2, H))}
          p2={vec(width, calcCenter(2, H))}
          color="#c2c2c2"
          strokeWidth={2}
          style="stroke"
        />

        <Line
          p1={vec(calcCenter(2, width), calcCenter(RADIUS, H))}
          p2={vecPos}
          color="#47d21d"
          strokeWidth={2}
          style="stroke"
          origin={vec(calcCenter(RADIUS, width), calcCenter(RADIUS, H))}
        />

        <Path path={arcPos} color="#f3951b" strokeWidth={2} style="stroke" />
      </Canvas>
    </View>
  );
};

export default SinCos;
