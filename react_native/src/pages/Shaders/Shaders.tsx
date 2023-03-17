import {
  Canvas,
  Fill,
  Shader,
  Skia,
  useClockValue,
  useComputedValue,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions, View} from 'react-native';
export const {height, width} = Dimensions.get('window');

type Props = {};

const WIDTH = 300;
const HEIGHT = 160;

const source = Skia.RuntimeEffect.Make(`

  uniform float clock;
  uniform vec2 size;

  vec4 main(vec2 pos) {
    vec2 normalized = pos/size;
      vec3 color = vec3(0.0);
    float d = 0.0;
    normalized = normalized *2.-1.;
    d = length( abs(normalized)+10. );
    color = vec3(fract(d*5.+cos(clock*0.002)));
    color = mix(color,vec3(1.),vec3(0.0, 0.2471, 0.4118));

    return vec4(color, 1);
  }

 `)!;
console.log(source);

const Shaders = (props: Props) => {
  const clock = useClockValue();
  const size = vec(width, height);
  const uniforms = useComputedValue(
    () => ({size, clock: clock.current}),
    [clock],
  );

  return (
    <View>
      <Canvas style={{width: width, height: height}}>
        <Fill>
          <Shader source={source} uniforms={uniforms} />
        </Fill>
      </Canvas>
    </View>
  );
};

export default Shaders;
