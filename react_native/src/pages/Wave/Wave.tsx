import {
  Canvas,
  Path,
  useClockValue,
  useComputedValue,
  useValue,
  Circle,
  interpolate,
  useLoop,
  Easing,
} from '@shopify/react-native-skia';
import React, {useEffect} from 'react';
import {Dimensions, Settings, View} from 'react-native';
export const {height, width} = Dimensions.get('window');

type Props = {};

const WIDTH = 300;
const HEIGHT = 160;
this.points = [];

const SETTINGS = {
  points: 20,
  amp: 10,
  speed: 10,
  stroke: 20,
};

const Wave = (props: Props) => {
  const time = useValue(0);
  const progress = useLoop({
    duration: 1000,
    easing: Easing.inOut(Easing.sin),
  });
  let points = useValue<Array<number>>([]);

  const createPath = () => {
    let value = interpolate(
      progress.current,
      [0, 1],
      [-1 * SETTINGS.amp, SETTINGS.amp],
    );
    let path = points.current.map(x => {
      const y =
        SETTINGS.stroke / 2 +
        value * Math.sin((x + time.current) / SETTINGS.points);
      return `${x},${y}`;
    });
    let pathGenerate = `M${path.join(' L')}`;
    return pathGenerate;
  };

  useEffect(() => {
    let pointsTmp = [];
    for (let i = 0; i <= WIDTH; i++) {
      pointsTmp.push(i);
    }
    points.current = pointsTmp;
    createPath();
  }, []);

  const path = useComputedValue(() => {
    let d = createPath(progress.current);
    time.current = time.current + SETTINGS.speed;
    return d;
  }, [progress]);

  return (
    <View
      style={{
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: '#ffffff',
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Canvas style={{width: WIDTH, height: HEIGHT}}>
        <Path
          strokeWidth={SETTINGS.stroke}
          color={'#2472d7'}
          style="stroke"
          strokeJoin="round"
          path={path}
          transform={[
            {
              translateY: HEIGHT / 2,
            },
          ]}
        />
      </Canvas>
    </View>
  );
};

export default Wave;
