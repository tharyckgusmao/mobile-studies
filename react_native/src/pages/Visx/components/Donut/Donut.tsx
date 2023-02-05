import {
  Canvas,
  FitBox,
  Group,
  Path,
  rect,
  runSpring,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import {arc, pie} from '@visx/shape';
import {FC, useEffect, useMemo} from 'react';
import {View} from 'react-native';
import React from 'react';
import {delay} from 'react-native-reanimated/lib/types/lib/reanimated2/animation/delay';
type IDonut = {
  data: Array<{
    value: number;
    label: string;
    color: string;
    labelFormatted: string;
  }>;
  animate: boolean;
  height: number;
  width: number;
  delay: number;
};

const AnimatedPath = ({color, value, startAngle, endAngle, path, arc}) => {
  const pathAnimate = useComputedValue(() => {
    return SkiaApi.Path.MakeFromSVGString(
      path({
        ...arc,
        startAngle: startAngle * (value.current / 100),
        endAngle: endAngle * (value.current / 100),
      }),
    );
  }, [value]);

  if (!startAngle) {
    return null;
  }
  return <Path path={pathAnimate} color={color} />;
};

export const Donut: FC<IDonut> = ({
  data,
  animate,
  width = 0,
  height = 0,
  delay = 0,
}) => {
  const progressAnimate = useValue(0);

  const pieRender = useMemo(() => {
    const defaultValues = {
      pieValue: d => d.value,
      pieSort: null,
      outerRadius: width / 2,
      innerRadius: width / 3,
      padAngle: 0.02,
      startAngle: -(Math.PI / 2),
      endAngle: Math.PI / 2,
      cornerRadius: 12,
    };
    const {
      innerRadius,
      outerRadius,
      cornerRadius,

      startAngle,
      endAngle,
      padAngle,
      pieValue,
      pieSort,
    } = defaultValues;
    const path = arc<any>({
      innerRadius,
      outerRadius,
      cornerRadius,
    });

    const piee = pie<any>({
      startAngle,
      endAngle,
      padAngle,
      value: pieValue,
      sort: pieSort,
    });

    const arcs = piee(data);
    return arcs.map((arc, i) => {
      if (!animate) {
        return <Path path={path(arc) || ''} color={arc.data.color} />;
      }
      return (
        <AnimatedPath
          startAngle={arc.startAngle}
          endAngle={arc.endAngle}
          arc={arc}
          path={path}
          color={arc.data.color}
          value={progressAnimate}
        />
      );
    });
  }, []);

  useEffect(() => {
    if (pieRender) {
      setTimeout(() => {
        runSpring(progressAnimate, 100);
      }, delay);
    }
  }, [pieRender]);

  return (
    <View>
      <Canvas style={{width: width, height: height}}>
        <FitBox
          src={rect(0, 0, width, Math.PI)}
          dst={rect(0, 0, width, height)}>
          <Group
            transform={[
              {
                translateX: width / 2,
              },
              {
                translateY: 100,
              },
            ]}>
            {pieRender}
          </Group>
        </FitBox>
      </Canvas>
    </View>
  );
};

export default Donut;
