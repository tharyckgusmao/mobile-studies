import {
  Canvas,
  Circle,
  dist,
  Fill,
  Group,
  interpolate,
  SweepGradient,
  useComputedValue,
  useTouchHandler,
  useValue,
  vec,
  Rect,
  Mask
} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions, View} from 'react-native';
const {height, width} = Dimensions.get('window');

type Props = {};

const WIDTH = 300;
const HEIGHT = 160;
const COLS = 12;
const ROWS = 7;
const R = 90;
const rows = new Array(COLS).fill(0).map((_, i) => i);
const cols = new Array(ROWS).fill(0).map((_, i) => i);

const Dot = ({i, j, pointer}) => {
  const SIZE = {width: WIDTH / COLS, height: HEIGHT / ROWS};
  const x = i * SIZE.width + 10;
  const y = j * SIZE.height + 10;

  const origin = vec(x + SIZE.width / 2, y + SIZE.height / 2);
  const transform = useComputedValue(() => {
    const distance = dist(pointer.current, origin);
    return [
      {
        scale: interpolate(distance, [0, R], [0.5, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp'
        })
      }
    ];
  }, [pointer]);
  return (
    <Group transform={transform} origin={origin}>
      <Circle cx={x} cy={y} r={10} color="black" />
    </Group>
  );
};

export default function Mesh({}: Props) {
  const pointer = useValue({x: WIDTH / 2, y: HEIGHT / 2});

  const onTouch = useTouchHandler({
    onActive: pt => {
      pointer.current = pt;
    }
  });
  return (
    <View
      style={{
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: '#16191e',
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Canvas style={{width: WIDTH, height: HEIGHT}} onTouch={onTouch}>
        <Mask
          mask={rows.map((_i, i) =>
            cols.map((_j, j) => {
              return <Dot key={`${i}-${j}`} i={i} j={j} pointer={pointer} />;
            })
          )}>
          <Group>
            <Rect x={0} y={0} width={WIDTH} height={HEIGHT}>
              <SweepGradient
                c={vec(128, 128)}
                colors={['cyan', 'magenta', 'yellow', 'cyan']}
              />
            </Rect>
          </Group>
        </Mask>
      </Canvas>
    </View>
  );
}
