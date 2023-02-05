import React from 'react';
import {Dimensions, View} from 'react-native';
import Donut from './components/Donut/Donut';
export const {height, width} = Dimensions.get('window');

type Props = {};

const Visx = (props: Props) => {
  return (
    <View style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
      <Donut
        animate={true}
        width={width - 60}
        height={300}
        delay={400}
        data={[
          {
            value: 73.5,
            label: 'Homens',
            color: '#2885e1',
            labelFormatted: 'Aprovado',
          },
          {
            value: 7.4,
            label: 'Reprovado',
            color: '#d74f4f',
            labelFormatted: 'Reprovado',
          },
          {
            value: 19.1,
            label: 'Neutro',
            color: '#FF3300',
            labelFormatted: 'Faltas',
          },
        ]}
      />
      <Donut
        animate={false}
        width={width - 60}
        height={300}
        delay={0}
        data={[
          {
            value: 30.5,
            label: 'Homens',
            color: '#2885e1',
            labelFormatted: 'Aprovado',
          },
          {
            value: 20.5,
            label: 'Other',
            color: '#e1b028',
            labelFormatted: 'Aprovado',
          },
          {
            value: 10,
            label: 'Reprovado',
            color: '#d74f4f',
            labelFormatted: 'Reprovado',
          },
          {
            value: 12,
            label: 'Neutro',
            color: '#FF3300',
            labelFormatted: 'Faltas',
          },
        ]}
      />
      {/* <Donut animate={true} /> */}
    </View>
  );
};

export default Visx;
