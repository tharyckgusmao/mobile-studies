import {
  Canvas,
  Circle,
  clamp,
  useSharedValueEffect,
  useTouchHandler,
  useValue,
  Path,
  useDerivedValue,
  interpolatePaths,
  useSpring,
  Skia,
  cartesian2Polar,
  Extrapolate
} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {useSharedValue, withSpring} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');
export const controlPoint = (
  current: Vector,
  previous: Vector,
  next: Vector,
  reverse: boolean,
  smoothing: number
) => {
  const p = previous || current;
  const n = next || current;
  // Properties of the opposed-line
  const lengthX = n.x - p.x;
  const lengthY = n.y - p.y;

  const o = cartesian2Polar({x: lengthX, y: lengthY});
  // If is end-control-point, add PI to the angle to go backward
  const angle = o.theta + (reverse ? Math.PI : 0);
  const length = o.radius * smoothing;
  // The control point position is relative to the current point
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;
  return {x, y};
};
export const curveLines = (
  points: Vector[],
  smoothing: number,
  strategy: 'complex' | 'bezier' | 'simple'
) => {
  const path = Skia.Path.Make();
  path.moveTo(points[0].x, points[0].y);
  // build the d attributes by looping over the points
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      continue;
    }
    const point = points[i];
    const next = points[i + 1];
    const prev = points[i - 1];
    const cps = controlPoint(prev, points[i - 2], point, false, smoothing);
    const cpe = controlPoint(point, prev, next, true, smoothing);

    switch (strategy) {
      case 'simple':
        const cp = {
          x: (cps.x + cpe.x) / 2,
          y: (cps.y + cpe.y) / 2
        };
        path.quadTo(cp.x, cp.y, point.x, point.y);
        break;
      case 'bezier':
        const p0 = points[i - 2] || prev;
        const p1 = points[i - 1];
        const cp1x = (2 * p0.x + p1.x) / 3;
        const cp1y = (2 * p0.y + p1.y) / 3;
        const cp2x = (p0.x + 2 * p1.x) / 3;
        const cp2y = (p0.y + 2 * p1.y) / 3;
        const cp3x = (p0.x + 4 * p1.x + point.x) / 6;
        const cp3y = (p0.y + 4 * p1.y + point.y) / 6;
        path.cubicTo(cp1x, cp1y, cp2x, cp2y, cp3x, cp3y);
        if (i === points.length - 1) {
          path.cubicTo(
            points[points.length - 1].x,
            points[points.length - 1].y,
            points[points.length - 1].x,
            points[points.length - 1].y,
            points[points.length - 1].x,
            points[points.length - 1].y
          );
        }
        break;
      case 'complex':
        path.cubicTo(cps.x, cps.y, cpe.x, cpe.y, point.x, point.y);
        break;
      default:
        null;
    }
  }
  return path;
};

type Props = {};
const COLUMN_DRAG_WIDTH = width / 2;
const COLUMN_DRAG_HEIGHT = 200;

const RopeSnap = (props: Props) => {
  const cx1 = useValue(24);
  const cy1 = useValue(24);
  const cx2 = useValue(24);
  const cy2 = useValue(24);
  const x = useValue(0);
  const scaleRadius = useValue(20);
  const scaleRadiusSahred = useSharedValue(20);

  const scaleRadius2 = useValue(20);
  const scaleRadius2Sahred = useSharedValue(20);
  const skValue = useValue(0);
  const skValueShared = useSharedValue(0);

  // `m ${cx1} 20 c 40 0 70 0 100 0`
  const path1 = curveLines(
    [
      {x: 24, y: 24},
      {x: COLUMN_DRAG_WIDTH / 2, y: 24},
      {x: COLUMN_DRAG_WIDTH, y: 24}
    ],
    0.2,
    'complex'
  );

  const touchColOneHandler = useTouchHandler({
    onStart: () => {
      scaleRadiusSahred.value = withSpring(24);
    },
    onActive: ({x, y}) => {
      cx1.current = clamp(x, 24, COLUMN_DRAG_WIDTH - 24);
      cy1.current = clamp(y, 24, COLUMN_DRAG_HEIGHT - 24);
      skValueShared.value = withSpring(1);
    },
    onEnd: () => {
      scaleRadiusSahred.value = withSpring(20);
      skValueShared.value = withSpring(0);
    }
  });
  const touchColTwoHandler = useTouchHandler({
    onStart: () => {
      scaleRadius2Sahred.value = withSpring(24);
    },
    onActive: ({x, y}) => {
      cx2.current = clamp(x, 24, COLUMN_DRAG_WIDTH - 24);
      cy2.current = clamp(y, 24, COLUMN_DRAG_HEIGHT - 24);
      skValueShared.value = withSpring(1);
    },
    onEnd: () => {
      scaleRadius2Sahred.value = withSpring(20);
      skValueShared.value = withSpring(0);
    }
  });

  useSharedValueEffect(() => {
    scaleRadius.current = scaleRadiusSahred.value;
  }, scaleRadiusSahred);
  useSharedValueEffect(() => {
    scaleRadius2.current = scaleRadius2Sahred.value;
  }, scaleRadius2Sahred);

  useSharedValueEffect(() => {
    skValue.current = skValueShared.value;
  }, skValueShared);

  const animatedPath = useDerivedValue(() => {
    const path2 = curveLines(
      [
        {x: cx1.current - 12, y: cy1.current - 12},
        {
          x: COLUMN_DRAG_WIDTH / 2 + cx1.current,
          y: cy2.current + cy1.current
        },
        {x: COLUMN_DRAG_WIDTH + cx2.current, y: cy2.current}
      ],
      0.2,
      'complex'
    );

    return interpolatePaths(
      skValue.current,
      [0, 1],
      [path1, path2],
      Extrapolate.EXTEND
    );
  }, [cx1, cy1, cx2, cy2]);
  return (
    <View
      style={{
        flexDirection: 'column',
        flexGrow: 1
      }}>
      <View
        style={{
          padding: 40
        }}>
        <Text>RopeSnap</Text>
      </View>
      <View>
        <Canvas
          style={{
            width: COLUMN_DRAG_WIDTH * 2,
            height: COLUMN_DRAG_HEIGHT,
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundColor: 'red'
          }}>
          <Path path={animatedPath} color="lightblue" stroke={{width: 4}} />
        </Canvas>
        <Canvas
          style={{
            width: COLUMN_DRAG_WIDTH,
            height: COLUMN_DRAG_HEIGHT,
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundColor: 'red'
          }}
          onTouch={touchColOneHandler}>
          <Path path={animatedPath} color="lightblue" stroke={{width: 4}} />

          <Circle cx={cx1} cy={cy1} r={scaleRadius} color="magenta" />
        </Canvas>
        <Canvas
          style={{
            width: COLUMN_DRAG_WIDTH,
            height: COLUMN_DRAG_HEIGHT,
            position: 'absolute',
            left: COLUMN_DRAG_WIDTH,
            top: 0
          }}
          onTouch={touchColTwoHandler}>
          <Circle cx={cx2} cy={cy2} r={scaleRadius2} color="cyan" />
        </Canvas>
      </View>
    </View>
  );
};

export default RopeSnap;
